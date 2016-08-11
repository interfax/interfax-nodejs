class Documents {

  constructor(client) {
    this._client = client;
  }

  create(filename, file_size, options, callback) {
    if (typeof(options) === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    options.name = filename;
    options.size = file_size;

    return this._client.post('/outbound/documents', options, callback);
  }
}

export default Documents;
