class Delivery {

  constructor(client) {
    this._client = client;
  }

  deliver(params, callback) {
    console.log(params);
    console.log(callback);
  }
}

export default Delivery;
