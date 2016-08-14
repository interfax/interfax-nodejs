import fs   from 'fs';
import mime from 'mime';

class File {
  constructor(documents, location, options) {
    this._documents = documents;
    this.ready = false;
    this._callbacks = [];

    options = options || {};
    this._chunkSize = options.chunkSize || 1024*1024;

    if (options.mimeType) {
      this.initializeBinary(location, options.mimeType);
    } else if (location.startsWith('http://') || location.startsWith('https://')) {
      this.initializeUrl(location);
    } else {
      this.initializePath(location);
    }
  }

  onReady(callback) {
    if (this.ready) return callback(this.ready);
    this._callbacks.push(callback);
  }

  initializeBinary(data, mimeType) {
    if (data.length > this._chunkSize) {
      return this.initializeDocument(data, mimeType);
    }

    this.header = `Content-Type: ${mimeType}`;
    this.body   = data;
    this._triggerReady(true);
  }

  initializeUrl(url) {
    this.header = `Content-Location: ${url}`;
    this.body   = null;
    this._triggerReady(true);
  }

  initializePath(path) {
    let data = fs.readFileSync(path);
    let mimeType = mime.lookup(path);

    this.initializeBinary(data, mimeType);
  }

  initializeDocument(data, mimeType) {
    let extension = mime.extension(mimeType);
    let filename = `upload-${Date.now()}.${extension}`;

    this._documents.create(filename, data.length)
      .then(this._startUpload(data).bind(this))
      .catch(this._triggerReady.bind(this));
  }

  _startUpload(data) {
    return (document) => {
      this.header = `Content-Location: ${document.url}`;
      this.body = null;

      this._upload(0, document, data)();
    };
  }

  _upload(cursor, document, data) {
    let finished = (cursor >= data.length);

    return () => {
      if (finished) { return this._triggerReady(true); }

      let chunk = data.slice(cursor, cursor+this._chunkSize);
      let nextCursor = cursor+Buffer.byteLength(chunk);

      return this._documents.upload(document.id, cursor, nextCursor-1, chunk)
        .then(this._upload(nextCursor, document, data).bind(this))
        .catch(this._triggerReady.bind(this));
    }
  }

  _triggerReady(response) {
    this.ready = (response === true);
    for (let callback of this._callbacks) {
      callback(response);
    }
    return this.ready;
  }
}

export default File;
