import File from './file';
import EventEmitter     from 'events';

class Delivery {

  constructor(client, documents) {
    this._client    = client;
    this._documents = documents;
    this._boundary  = '43e578690a6d14bf1d776cd55e7d7e29';
    this._emitter    = new EventEmitter();
  }

  deliver(params, callback) {
    let [validatedParams, files] = this._validateParams(params);
    let promise = this._promise(callback);

    this._generateFileObjects(files, this._deliverFiles(validatedParams).bind(this));

    return promise;
  }

  _deliverFiles(validatedParams) {
    return (error, fileObjects) => {
      if (error) { return this._emitDeliveryFailure(error); }

      let body    = this._bodyFor(fileObjects);
      let length  = this._lengthFor(body);
      let headers = {
        'Content-Type' : `multipart/mixed; boundary=${this._boundary}`,
        'Content-Length' : length
      };

      return this._client.request('POST', '/outbound/faxes', headers, body, validatedParams)
        .then(this._emitDeliverySuccess.bind(this))
        .catch(this._emitDeliveryFailure.bind(this));
    };
  }

  _emitDeliverySuccess(result) {
    this._emitter.emit('resolve', result);
  }

  _emitDeliveryFailure(error) {
    this._emitter.emit('reject', error);
  }

  _validateParams(params) {
    if (!params.faxNumber)
      throw new Error('Missing argument: faxNumber');

    if (!params.file && !params.files)
      throw new Error('Missing argument: file or files');

    let files = [params.file || params.files];
    files = this._flatten(files);

    delete params['file'];
    delete params['files'];

    return [params, files];
  }

  _generateFileObjects(files, callback) {
    let objects = [];

    for (let file of files) {
      let object = file;
      if (typeof(file) === 'string') {
        object = new File(this._documents, file);
      }
      object.onReady((response) => {
        if (!object.ready) { callback(response, null); }
        objects.push(object);
        if (objects.length == files.length) { callback(null, objects); }
      });
    }
    return null;
  }

  _bodyFor(files) {
    let parts = files.map(file => {
      let elements = [`--${this._boundary}`, '\r\n', file.header, '\r\n\r\n'];
      if (file.body) {
        elements.push(file.body);
        elements.push('\r\n\r\n');
      }
      return elements;
    });
    parts.push(`--${this._boundary}--`);
    return this._flatten(parts);
  }

  _lengthFor(parts) {
    return parts.reduce((prev, cur) => {
      return prev + Buffer.byteLength(cur);
    }, 0);
  }

  _flatten(list) {
    return [].concat.apply([], list);
  }

  _promise(callback) {
    return new Promise((resolve, reject) => {
      this._emitter.on('resolve', (response) => {
        if (callback) { callback(null, response); }
        resolve(response);
      });
      this._emitter.on('reject', (error) => {
        if (callback) { callback(error, null); }
        reject(error);
      });
    });
  }
}

export default Delivery;
