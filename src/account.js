class Account {

  constructor(client) {
    this._client = client;
  }

  balance(callback) {
    this._client.get('/accounts/self/ppcards/balance', callback);
  }
}

export default Account;
