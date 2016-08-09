class Outbound {
  constructor(client) {
    this._client = client;
  }

  all(params, callback) {
    this._client.get('/outbound/faxes', params, callback);
  }
}

export default Outbound;
