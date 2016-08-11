class Outbound {
  constructor(client, delivery) {
    this._client = client;
    this._delivery = delivery;
  }

  deliver(params, callback) {
    return this._delivery.deliver(params, callback);
  }

  all(params, callback) {
    return this._client.get('/outbound/faxes', params, callback);
  }

  completed(ids, callback) {
    return this._client.get('/outbound/faxes/completed', { 'ids' : ids }, callback);
  }

  find(id, callback) {
    return this._client.get(`/outbound/faxes/${id}`, callback);
  }

  image(id, callback) {
    return this._client.get(`/outbound/faxes/${id}/image`, callback);
  }

  cancel(id, callback) {
    return this._client.post(`/outbound/faxes/${id}/cancel`, callback);
  }

  search(params, callback) {
    return this._client.get('/outbound/search', params, callback);
  }
}

export default Outbound;
