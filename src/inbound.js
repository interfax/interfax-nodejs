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

  mark(id, is_read, callback) {
    return this._client.post(`/inbound/faxes/${id}/mark`, { unread: !is_read }, callback);
  }

  resend(id, email, callback) {
    let options = {};
    if (typeof(email) === 'string') { options.email = email; }
    else if(typeof(email) === 'function') { callback = email; }
    return this._client.post(`/inbound/faxes/${id}/resend`, options, callback);
  }
}

export default Inbound;
