import File from './file';

class Files {
  constructor(documents) {
    this._documents = documents;
  }

  create(data, options) {
    return new File(this._documents, data, options);
  }
}

export default Files;
