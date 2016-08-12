import ResponseHandler  from './response-handler';
import ErrorHandler     from './error-handler';
import Promise          from 'bluebird';
import EventEmitter     from 'events';

class Client {
  constructor(https, credentials, version, debug) {
    this._https = https;
    this._credentials = credentials || {};
    this._version = version;
    this._debug = debug || false;
    this._validateCredentials();
  }

  get(path, params, callback) {
    return this.request('GET', path, {}, null, params, callback);
  }

  post(path, params, callback) {
    return this.request('POST', path, {}, null, params, callback);
  }

  delete(path, params, callback) {
    return this.request('DELETE', path, {}, null, params, callback);
  }

  request(method, path, headers, body, params, callback) {
    let emitter     = new EventEmitter();
    let __callback  = this._callback(params, callback);
    let promise     = this._promise(emitter, __callback);
    let options     = this._options(method, path, headers, params);
    var request     = this._https.request(options);

    if (this._debug) {
      console.log(headers); // eslint-disable-line no-console
      console.log(options); // eslint-disable-line no-console
    }

    request.on('response', new ResponseHandler(emitter, this._debug));
    request.on('error', new ErrorHandler(emitter, this._debug));

    if (body) {
      if (this._debug) {
        console.log(`Writing body (length: ${body.length})`);  // eslint-disable-line no-console
        console.log(body); // eslint-disable-line no-console
      }
      request.write(body);
    }

    request.end();

    return promise;
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

  _callback(...args) {
    for (let i = args.length-1; i >= 0; i--) {
      let argument = args[i];
      if (typeof(argument) ===  'function') return argument;
    }
    return null;
  }

  _options(method, path, headers, params) {
    headers['User-Agent'] = `InterFAX Node ${this._version}`;

    return {
      'host': 'rest.interfax.net',
      'path': this._path(path, params),
      'port': 443,
      'auth': `${this._credentials.username}:${this._credentials.password}`,
      'method': method,
      'headers': headers
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
