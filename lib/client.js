'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _responseHandler = require('./response-handler');

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(https, credentials, version, debug) {
    _classCallCheck(this, Client);

    this._https = https;
    this._credentials = credentials || {};
    this._version = version;
    this._debug = debug || false;
    this._validateCredentials();
  }

  _createClass(Client, [{
    key: 'get',
    value: function get(path, params, callback) {
      return this.request('GET', path, {}, null, params, callback);
    }
  }, {
    key: 'post',
    value: function post(path, params, callback) {
      return this.request('POST', path, {}, null, params, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(path, params, callback) {
      return this.request('DELETE', path, {}, null, params, callback);
    }
  }, {
    key: 'request',
    value: function request(method, path, headers, body, params, callback) {
      var emitter = new _events2.default();
      var __callback = this._callback(params, callback);
      var promise = this._promise(emitter, __callback);
      var options = this._options(method, path, headers, params);
      var request = this._https.request(options);

      if (this._debug) {
        console.log(headers); // eslint-disable-line no-console
        console.log(options); // eslint-disable-line no-console
      }

      request.on('response', new _responseHandler2.default(emitter, this._debug));
      request.on('error', new _errorHandler2.default(emitter, this._debug));

      this._writeBody(request, body);

      request.end();

      return promise;
    }

    // private methods

  }, {
    key: '_validateCredentials',
    value: function _validateCredentials() {
      this._credentials.username = this._credentials.username || process.env.INTERFAX_USERNAME;
      if (!this._credentials.username) throw new Error('Missing argument: username');

      this._credentials.password = this._credentials.password || process.env.INTERFAX_PASSWORD;
      if (!this._credentials.password) throw new Error('Missing argument: password');
    }
  }, {
    key: '_callback',
    value: function _callback() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = args.length - 1; i >= 0; i--) {
        var argument = args[i];
        if (typeof argument === 'function') return argument;
      }
      return null;
    }
  }, {
    key: '_options',
    value: function _options(method, path, headers, params) {
      headers['User-Agent'] = 'InterFAX Node ' + this._version;

      return {
        'host': 'rest.interfax.net',
        'path': this._path(path, params),
        'port': 443,
        'auth': this._credentials.username + ':' + this._credentials.password,
        'method': method,
        'headers': headers
      };
    }
  }, {
    key: '_path',
    value: function _path(path, params) {
      var query = this._query(params);
      return path + '?' + query;
    }
  }, {
    key: '_query',
    value: function _query(params) {
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') params = {};
      return Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      }).join('&');
    }
  }, {
    key: '_writeBody',
    value: function _writeBody(request, body) {
      if (!body) {
        return;
      }

      if (typeof body === 'string' || body instanceof Buffer) {
        request.write(body);
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var part = _step.value;

            request.write(part);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: '_promise',
    value: function _promise(emitter, callback) {
      return new _bluebird2.default(function (resolve, reject) {
        emitter.on('resolve', function (response) {
          if (callback) {
            callback(null, response);
          }
          resolve(response);
        });
        emitter.on('reject', function (error) {
          if (callback) {
            callback(error, null);
          }
          reject(error);
        });
      });
    }
  }]);

  return Client;
}();

exports.default = Client;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiQ2xpZW50IiwiaHR0cHMiLCJjcmVkZW50aWFscyIsInZlcnNpb24iLCJkZWJ1ZyIsIl9odHRwcyIsIl9jcmVkZW50aWFscyIsIl92ZXJzaW9uIiwiX2RlYnVnIiwiX3ZhbGlkYXRlQ3JlZGVudGlhbHMiLCJwYXRoIiwicGFyYW1zIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJlbWl0dGVyIiwiX19jYWxsYmFjayIsIl9jYWxsYmFjayIsInByb21pc2UiLCJfcHJvbWlzZSIsIm9wdGlvbnMiLCJfb3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJvbiIsIl93cml0ZUJvZHkiLCJlbmQiLCJ1c2VybmFtZSIsInByb2Nlc3MiLCJlbnYiLCJJTlRFUkZBWF9VU0VSTkFNRSIsIkVycm9yIiwicGFzc3dvcmQiLCJJTlRFUkZBWF9QQVNTV09SRCIsImFyZ3MiLCJpIiwibGVuZ3RoIiwiYXJndW1lbnQiLCJfcGF0aCIsInF1ZXJ5IiwiX3F1ZXJ5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsImsiLCJqb2luIiwiQnVmZmVyIiwid3JpdGUiLCJwYXJ0IiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3BvbnNlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsTTtBQUNKLGtCQUFZQyxLQUFaLEVBQW1CQyxXQUFuQixFQUFnQ0MsT0FBaEMsRUFBeUNDLEtBQXpDLEVBQWdEO0FBQUE7O0FBQzlDLFNBQUtDLE1BQUwsR0FBY0osS0FBZDtBQUNBLFNBQUtLLFlBQUwsR0FBb0JKLGVBQWUsRUFBbkM7QUFDQSxTQUFLSyxRQUFMLEdBQWdCSixPQUFoQjtBQUNBLFNBQUtLLE1BQUwsR0FBY0osU0FBUyxLQUF2QjtBQUNBLFNBQUtLLG9CQUFMO0FBQ0Q7Ozs7d0JBRUdDLEks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QUFDMUIsYUFBTyx1QkFBWSxVQUFDd0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDcEMsZ0JBQVFTLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFVBQUM0QixRQUFELEVBQWM7QUFDbEMsY0FBSTFDLFFBQUosRUFBYztBQUFFQSxxQkFBUyxJQUFULEVBQWUwQyxRQUFmO0FBQTJCO0FBQzNDRixrQkFBUUUsUUFBUjtBQUNELFNBSEQ7QUFJQXJDLGdCQUFRUyxFQUFSLENBQVcsUUFBWCxFQUFxQixVQUFDNkIsS0FBRCxFQUFXO0FBQzlCLGNBQUkzQyxRQUFKLEVBQWM7QUFBRUEscUJBQVMyQyxLQUFULEVBQWdCLElBQWhCO0FBQXdCO0FBQ3hDRixpQkFBT0UsS0FBUDtBQUNELFNBSEQ7QUFJRCxPQVRNLENBQVA7QUFVRDs7Ozs7O2tCQUdZdkQsTSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzcG9uc2VIYW5kbGVyICBmcm9tICcuL3Jlc3BvbnNlLWhhbmRsZXInO1xuaW1wb3J0IEVycm9ySGFuZGxlciAgICAgZnJvbSAnLi9lcnJvci1oYW5kbGVyJztcbmltcG9ydCBQcm9taXNlICAgICAgICAgIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgICAgIGZyb20gJ2V2ZW50cyc7XG5cbmNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKGh0dHBzLCBjcmVkZW50aWFscywgdmVyc2lvbiwgZGVidWcpIHtcbiAgICB0aGlzLl9odHRwcyA9IGh0dHBzO1xuICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gY3JlZGVudGlhbHMgfHwge307XG4gICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgdGhpcy5fZGVidWcgPSBkZWJ1ZyB8fCBmYWxzZTtcbiAgICB0aGlzLl92YWxpZGF0ZUNyZWRlbnRpYWxzKCk7XG4gIH1cblxuICBnZXQocGF0aCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIHBhdGgsIHt9LCBudWxsLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHBvc3QocGF0aCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBwYXRoLCB7fSwgbnVsbCwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH1cblxuICBkZWxldGUocGF0aCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIHBhdGgsIHt9LCBudWxsLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlcXVlc3QobWV0aG9kLCBwYXRoLCBoZWFkZXJzLCBib2R5LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IGVtaXR0ZXIgICAgID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGxldCBfX2NhbGxiYWNrICA9IHRoaXMuX2NhbGxiYWNrKHBhcmFtcywgY2FsbGJhY2spO1xuICAgIGxldCBwcm9taXNlICAgICA9IHRoaXMuX3Byb21pc2UoZW1pdHRlciwgX19jYWxsYmFjayk7XG4gICAgbGV0IG9wdGlvbnMgICAgID0gdGhpcy5fb3B0aW9ucyhtZXRob2QsIHBhdGgsIGhlYWRlcnMsIHBhcmFtcyk7XG4gICAgdmFyIHJlcXVlc3QgICAgID0gdGhpcy5faHR0cHMucmVxdWVzdChvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLl9kZWJ1Zykge1xuICAgICAgY29uc29sZS5sb2coaGVhZGVycyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cblxuICAgIHJlcXVlc3Qub24oJ3Jlc3BvbnNlJywgbmV3IFJlc3BvbnNlSGFuZGxlcihlbWl0dGVyLCB0aGlzLl9kZWJ1ZykpO1xuICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgbmV3IEVycm9ySGFuZGxlcihlbWl0dGVyLCB0aGlzLl9kZWJ1ZykpO1xuXG4gICAgdGhpcy5fd3JpdGVCb2R5KHJlcXVlc3QsIGJvZHkpO1xuXG4gICAgcmVxdWVzdC5lbmQoKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG5cbiAgX3ZhbGlkYXRlQ3JlZGVudGlhbHMoKSB7XG4gICAgdGhpcy5fY3JlZGVudGlhbHMudXNlcm5hbWUgPSB0aGlzLl9jcmVkZW50aWFscy51c2VybmFtZSB8fCBwcm9jZXNzLmVudi5JTlRFUkZBWF9VU0VSTkFNRTtcbiAgICBpZiAoIXRoaXMuX2NyZWRlbnRpYWxzLnVzZXJuYW1lKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGFyZ3VtZW50OiB1c2VybmFtZScpO1xuXG4gICAgdGhpcy5fY3JlZGVudGlhbHMucGFzc3dvcmQgPSB0aGlzLl9jcmVkZW50aWFscy5wYXNzd29yZCB8fCBwcm9jZXNzLmVudi5JTlRFUkZBWF9QQVNTV09SRDtcbiAgICBpZiAoIXRoaXMuX2NyZWRlbnRpYWxzLnBhc3N3b3JkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGFyZ3VtZW50OiBwYXNzd29yZCcpO1xuICB9XG5cbiAgX2NhbGxiYWNrKC4uLmFyZ3MpIHtcbiAgICBmb3IgKGxldCBpID0gYXJncy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBhcmd1bWVudCA9IGFyZ3NbaV07XG4gICAgICBpZiAodHlwZW9mKGFyZ3VtZW50KSA9PT0gICdmdW5jdGlvbicpIHJldHVybiBhcmd1bWVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfb3B0aW9ucyhtZXRob2QsIHBhdGgsIGhlYWRlcnMsIHBhcmFtcykge1xuICAgIGhlYWRlcnNbJ1VzZXItQWdlbnQnXSA9IGBJbnRlckZBWCBOb2RlICR7dGhpcy5fdmVyc2lvbn1gO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICdob3N0JzogJ3Jlc3QuaW50ZXJmYXgubmV0JyxcbiAgICAgICdwYXRoJzogdGhpcy5fcGF0aChwYXRoLCBwYXJhbXMpLFxuICAgICAgJ3BvcnQnOiA0NDMsXG4gICAgICAnYXV0aCc6IGAke3RoaXMuX2NyZWRlbnRpYWxzLnVzZXJuYW1lfToke3RoaXMuX2NyZWRlbnRpYWxzLnBhc3N3b3JkfWAsXG4gICAgICAnbWV0aG9kJzogbWV0aG9kLFxuICAgICAgJ2hlYWRlcnMnOiBoZWFkZXJzXG4gICAgfTtcbiAgfVxuXG4gIF9wYXRoKHBhdGgsIHBhcmFtcykge1xuICAgIGxldCBxdWVyeSA9IHRoaXMuX3F1ZXJ5KHBhcmFtcyk7XG4gICAgcmV0dXJuIGAke3BhdGh9PyR7cXVlcnl9YDtcbiAgfVxuXG4gIF9xdWVyeShwYXJhbXMpIHtcbiAgICBpZiAodHlwZW9mKHBhcmFtcykgIT09ICdvYmplY3QnKSBwYXJhbXMgPSB7fTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoayA9PiBgJHtlbmNvZGVVUklDb21wb25lbnQoayl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trXSl9YCkuam9pbignJicpO1xuICB9XG5cbiAgX3dyaXRlQm9keShyZXF1ZXN0LCBib2R5KSB7XG4gICAgaWYgKCFib2R5KSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHR5cGVvZihib2R5KSA9PT0gJ3N0cmluZycgfHwgYm9keSBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgcmVxdWVzdC53cml0ZShib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgcGFydCBvZiBib2R5KSB7XG4gICAgICAgIHJlcXVlc3Qud3JpdGUocGFydCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3Byb21pc2UoZW1pdHRlciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbigncmVzb2x2ZScsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpOyB9XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgICBlbWl0dGVyLm9uKCdyZWplY3QnLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgfVxuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50O1xuIl19