import https            from 'https';
import responseHandler  from './response-handler';
import errorHandler     from './error-handler';

class Client {
  constructor(credentials, version) {
    this._credentials = credentials;
    this._version = version;
  }

  get(path, params, callback) {
    this._request('GET', path, params, callback);
  }

  _request(method, path, params, callback) {
    let __callback  = this._callback(params, callback);
    let options     = this._options(method, path, params);
    var request     = https.request(options);

    request.on('response', responseHandler(__callback));
    request.on('error', errorHandler(__callback));
    request.end();
  }

  _callback(...args) {
    for (let i = args.length-1; i >= 0; i--) {
      let argument = args[i];
      if (typeof(argument) ===  'function') return argument;
    }
    return null;
  }

  _options(method, path, params) {
    return {
      'host': 'rest.interfax.net',
      'path': this._path(path, params),
      'port': 443,
      'auth': `${this._credentials.username}:${this._credentials.password}`,
      'method': method,
      'headers': {
        'User-Agent': `InterFAX Node ${this._version}`
      }
    };
  }

  _path(path, params) {
    let query = this._query(params);
    return `${path}?${query}`;
  }

  _query(params) {
    if (typeof(params) !== 'object') params = {};
    return Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  }
}

export default Client;
