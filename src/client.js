import ResponseHandler  from './response-handler';
import ErrorHandler     from './error-handler';
import Promise          from 'bluebird';
import EventEmitter     from 'events';

class Client {
  constructor(https, credentials, version) {
    this._https = https;
    this._credentials = credentials || {};
    this._version = version;
    this._validateCredentials();
  }

  get(path, params, callback) {
    return this._request('GET', path, params, callback);
  }

  // private methods

  _validateCredentials() {
    this._credentials.username = this._credentials.username || process.env.INTERFAX_USERNAME;
    if (!this._credentials.username)
      throw new Error('Missing argument: username');

    this._credentials.password = this._credentials.password || process.env.INTERFAX_PASSWORD;
    if (!this._credentials.password)
      throw new Error('Missing argument: password');
  }

  _request(method, path, params, callback) {
    let emitter     = new EventEmitter();
    let __callback  = this._callback(params, callback);
    let promise     = this._promise(emitter, __callback);
    let options     = this._options(method, path, params);
    var request     = this._https.request(options);

    request.on('response', new ResponseHandler(emitter));
    request.on('error', new ErrorHandler( emitter));
    request.end();

    return promise;
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

  _promise(emitter, callback) {
    return new Promise((resolve, reject) => {
      emitter.on('resolve', (response) => {
        if (callback) { callback(null, response); }
        resolve(response);
      });
      emitter.on('reject', (error) => {
        if (callback) { callback(error, null); }
        reject(error);
      });
    });
  }
}

export default Client;
