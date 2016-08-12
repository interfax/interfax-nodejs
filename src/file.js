import fs   from 'fs';
import mime from 'mime';

class File {
  constructor(documents, location, options) {
    this._documents = documents;
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

  initializeBinary(data, mimeType) {
    if (data.length > this._chunkSize) {
      return this.initializeDocument(data, mimeType);
    }

    this.header = `Content-Type: ${mimeType}`;
    this.body   = data;
  }

  initializeUrl(url) {
    this.header = `Content-Location: ${url}`;
    this.body   = null;
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
      .then(document => {
        this.header = `Content-Location: ${document.url}`;
        this.body = null;

        this._upload(0, document, data);
      });
  }

  _upload(cursor, document, data) {
    if (cursor >= data.length) { return; }
    let chunk = data.slice(cursor, cursor+this._chunkSize).toString('ASCII');
    let nextCursor = cursor+chunk.length;

    this._documents.upload(document.id, cursor, nextCursor-1, chunk)
      .then(() => { this._upload(nextCursor, document, data); });
  }
}

export default File;
