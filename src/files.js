import Promise          from 'bluebird';
import EventEmitter     from 'events';

import File from './file';

class Files {
  constructor(documents) {
    this._documents = documents;
  }

  create(data, options, callback) {
    let emitter = new EventEmitter();
    let promise = this._promise(emitter, callback);

    let file    = new File(this._documents, data, options);
    file.onReady((response) => {
      if (response === true) {
        emitter.emit('resolve', file);
      } else {
        emitter.emit('reject', response);
      }
    });

    return promise;
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

export default Files;
