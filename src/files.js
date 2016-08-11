import File from './file';

class Files {
  constructor(client) {
    this._client = client;
  }

  create(data, options) {
    return new File(this._client, data, options);
  }
}

export default Files;
