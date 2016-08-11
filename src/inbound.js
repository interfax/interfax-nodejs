class Inbound {
  constructor(client) {
    this._client = client;
  }

  all(params, callback) {
    return this._client.get('/inbound/faxes', params, callback);
  }

  find(id, callback) {
    return this._client.get(`/inbound/faxes/${id}`, callback);
  }

  image(id, callback) {
    return this._client.get(`/inbound/faxes/${id}/image`, callback);
  }

  emails(id, callback) {
    return this._client.get(`/inbound/faxes/${id}/emails`, callback);
  }
}

export default Inbound;
