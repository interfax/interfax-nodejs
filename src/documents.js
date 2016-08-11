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

  all(params, callback) {
    return this._client.get('/outbound/documents', params, callback);
  }
}

export default Documents;
