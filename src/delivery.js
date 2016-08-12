import File from './file';

class Delivery {

  constructor(client, documents) {
    this._client = client;
    this._documents = documents;
    this._boundary = '43e578690a6d14bf1d776cd55e7d7e29';
  }

  deliver(params, callback) {
    let [validatedParams, files] = this._validateParams(params);
    let fileObjects              = this._generateFileObjects(files);
    let body                     = this._bodyFor(fileObjects);
    let headers = {
      'Content-Type' : `multipart/mixed; boundary=${this._boundary}`,
      'Content-Length' : Buffer.byteLength(body)
    };

    return this._client.request('POST', '/outbound/faxes', headers, body, validatedParams, callback);
  }

  _validateParams(params) {
    if (!params.faxNumber)
      throw new Error('Missing argument: faxNumber');

    if (!params.file && !params.files)
      throw new Error('Missing argument: file or files');

    let files = [params.file || params.files];
    files = [].concat.apply([], files); // flatten array

    return [params, files];
  }

  _generateFileObjects(files) {
    return files.map((file) => {
      if (typeof(file) === 'string') {
        return new File(this._documents, file);
      } else {
        return file;
      }
    });
  }

  _bodyFor(files) {
    return files.map(file => {
      return `--${this._boundary}\r\n${file.header}\r\n\r\n${file.body}\r\n`;
    }).join('') + `--${this._boundary}\r\n`;
  }
}

export default Delivery;
