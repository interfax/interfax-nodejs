class Outbound {
  constructor(client) {
    this._client = client;
  }

  all(params, callback) {
    return this._client.get('/outbound/faxes', params, callback);
  }

  completed(ids, callback) {
    return this._client.get('/outbound/faxes/completed', { 'ids' : ids }, callback);
  }
}

export default Outbound;
