'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Delivery = function () {
  function Delivery(client, documents) {
    _classCallCheck(this, Delivery);

    this._client = client;
    this._documents = documents;
    this._boundary = '43e578690a6d14bf1d776cd55e7d7e29';
    this._emitter = new _events2.default();
  }

  _createClass(Delivery, [{
    key: 'deliver',
    value: function deliver(params, callback) {
      var _validateParams2 = this._validateParams(params),
          _validateParams3 = _slicedToArray(_validateParams2, 2),
          validatedParams = _validateParams3[0],
          files = _validateParams3[1];

      var promise = this._promise(callback);

      this._generateFileObjects(files, this._deliverFiles(validatedParams).bind(this));

      return promise;
    }
  }, {
    key: '_deliverFiles',
    value: function _deliverFiles(validatedParams) {
      var _this = this;

      return function (error, fileObjects) {
        if (error) {
          return _this._emitDeliveryFailure(error);
        }

        var body = _this._bodyFor(fileObjects);
        var length = _this._lengthFor(body);
        var headers = {
          'Content-Type': 'multipart/mixed; boundary=' + _this._boundary,
          'Content-Length': length
        };

        return _this._client.request('POST', '/outbound/faxes', headers, body, validatedParams).then(_this._emitDeliverySuccess.bind(_this)).catch(_this._emitDeliveryFailure.bind(_this));
      };
    }
  }, {
    key: '_emitDeliverySuccess',
    value: function _emitDeliverySuccess(result) {
      this._emitter.emit('resolve', result);
    }
  }, {
    key: '_emitDeliveryFailure',
    value: function _emitDeliveryFailure(error) {
      this._emitter.emit('reject', error);
    }
  }, {
    key: '_validateParams',
    value: function _validateParams(params) {
      if (!params.faxNumber) throw new Error('Missing argument: faxNumber');

      if (!params.file && !params.files) throw new Error('Missing argument: file or files');

      var files = [params.file || params.files];
      files = this._flatten(files);

      delete params['file'];
      delete params['files'];

      return [params, files];
    }
  }, {
    key: '_generateFileObjects',
    value: function _generateFileObjects(files, callback) {
      var _this2 = this;

      var objects = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          var object = file;
          if (typeof file === 'string') {
            object = new _file2.default(_this2._documents, file);
          }
          object.onReady(function (response) {
            if (!object.ready) {
              callback(response, null);
            }
            objects.push(object);
            if (objects.length == files.length) {
              callback(null, objects);
            }
          });
        };

        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      return null;
    }
  }, {
    key: '_bodyFor',
    value: function _bodyFor(files) {
      var _this3 = this;

      var parts = files.map(function (file) {
        var elements = ['--' + _this3._boundary, '\r\n', file.header, '\r\n\r\n'];
        if (file.body) {
          elements.push(file.body);
          elements.push('\r\n\r\n');
        }
        return elements;
      });
      parts.push('--' + this._boundary + '--');
      return this._flatten(parts);
    }
  }, {
    key: '_lengthFor',
    value: function _lengthFor(parts) {
      return parts.reduce(function (prev, cur) {
        return prev + Buffer.byteLength(cur);
      }, 0);
    }
  }, {
    key: '_flatten',
    value: function _flatten(list) {
      return [].concat.apply([], list);
    }
  }, {
    key: '_promise',
    value: function _promise(callback) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._emitter.on('resolve', function (response) {
          if (callback) {
            callback(null, response);
          }
          resolve(response);
        });
        _this4._emitter.on('reject', function (error) {
          if (callback) {
            callback(error, null);
          }
          reject(error);
        });
      });
    }
  }]);

  return Delivery;
}();

exports.default = Delivery;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWxpdmVyeS5qcyJdLCJuYW1lcyI6WyJEZWxpdmVyeSIsImNsaWVudCIsImRvY3VtZW50cyIsIl9jbGllbnQiLCJfZG9jdW1lbnRzIiwiX2JvdW5kYXJ5IiwiX2VtaXR0ZXIiLCJwYXJhbXMiLCJjYWxsYmFjayIsIl92YWxpZGF0ZVBhcmFtcyIsInZhbGlkYXRlZFBhcmFtcyIsImZpbGVzIiwicHJvbWlzZSIsIl9wcm9taXNlIiwiX2dlbmVyYXRlRmlsZU9iamVjdHMiLCJfZGVsaXZlckZpbGVzIiwiYmluZCIsImVycm9yIiwiZmlsZU9iamVjdHMiLCJfZW1pdERlbGl2ZXJ5RmFpbHVyZSIsImJvZHkiLCJfYm9keUZvciIsImxlbmd0aCIsIl9sZW5ndGhGb3IiLCJoZWFkZXJzIiwicmVxdWVzdCIsInRoZW4iLCJfZW1pdERlbGl2ZXJ5U3VjY2VzcyIsImNhdGNoIiwicmVzdWx0IiwiZW1pdCIsImZheE51bWJlciIsIkVycm9yIiwiZmlsZSIsIl9mbGF0dGVuIiwib2JqZWN0cyIsIm9iamVjdCIsIm9uUmVhZHkiLCJyZXNwb25zZSIsInJlYWR5IiwicHVzaCIsInBhcnRzIiwibWFwIiwiZWxlbWVudHMiLCJoZWFkZXIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyIiwiQnVmZmVyIiwiYnl0ZUxlbmd0aCIsImxpc3QiLCJjb25jYXQiLCJhcHBseSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxRO0FBRUosb0JBQVlDLE1BQVosRUFBb0JDLFNBQXBCLEVBQStCO0FBQUE7O0FBQzdCLFNBQUtDLE9BQUwsR0FBa0JGLE1BQWxCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQkYsU0FBbEI7QUFDQSxTQUFLRyxTQUFMLEdBQWtCLGtDQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBbUIsc0JBQW5CO0FBQ0Q7Ozs7NEJBRU9DLE0sRUFBUUMsUSxFQUFVO0FBQUEsNkJB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QUFqQixFQUEyQixVQUFDdkMsS0FBRCxFQUFXO0FBQ3BDLGNBQUlULFFBQUosRUFBYztBQUFFQSxxQkFBU1MsS0FBVCxFQUFnQixJQUFoQjtBQUF3QjtBQUN4Q3NDLGlCQUFPdEMsS0FBUDtBQUNELFNBSEQ7QUFJRCxPQVRNLENBQVA7QUFVRDs7Ozs7O2tCQUdZakIsUSIsImZpbGUiOiJkZWxpdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyICAgICBmcm9tICdldmVudHMnO1xuXG5jbGFzcyBEZWxpdmVyeSB7XG5cbiAgY29uc3RydWN0b3IoY2xpZW50LCBkb2N1bWVudHMpIHtcbiAgICB0aGlzLl9jbGllbnQgICAgPSBjbGllbnQ7XG4gICAgdGhpcy5fZG9jdW1lbnRzID0gZG9jdW1lbnRzO1xuICAgIHRoaXMuX2JvdW5kYXJ5ICA9ICc0M2U1Nzg2OTBhNmQxNGJmMWQ3NzZjZDU1ZTdkN2UyOSc7XG4gICAgdGhpcy5fZW1pdHRlciAgICA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIGRlbGl2ZXIocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCBbdmFsaWRhdGVkUGFyYW1zLCBmaWxlc10gPSB0aGlzLl92YWxpZGF0ZVBhcmFtcyhwYXJhbXMpO1xuICAgIGxldCBwcm9taXNlID0gdGhpcy5fcHJvbWlzZShjYWxsYmFjayk7XG5cbiAgICB0aGlzLl9nZW5lcmF0ZUZpbGVPYmplY3RzKGZpbGVzLCB0aGlzLl9kZWxpdmVyRmlsZXModmFsaWRhdGVkUGFyYW1zKS5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgX2RlbGl2ZXJGaWxlcyh2YWxpZGF0ZWRQYXJhbXMpIHtcbiAgICByZXR1cm4gKGVycm9yLCBmaWxlT2JqZWN0cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7IHJldHVybiB0aGlzLl9lbWl0RGVsaXZlcnlGYWlsdXJlKGVycm9yKTsgfVxuXG4gICAgICBsZXQgYm9keSAgICA9IHRoaXMuX2JvZHlGb3IoZmlsZU9iamVjdHMpO1xuICAgICAgbGV0IGxlbmd0aCAgPSB0aGlzLl9sZW5ndGhGb3IoYm9keSk7XG4gICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZScgOiBgbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT0ke3RoaXMuX2JvdW5kYXJ5fWAsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCcgOiBsZW5ndGhcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLl9jbGllbnQucmVxdWVzdCgnUE9TVCcsICcvb3V0Ym91bmQvZmF4ZXMnLCBoZWFkZXJzLCBib2R5LCB2YWxpZGF0ZWRQYXJhbXMpXG4gICAgICAgIC50aGVuKHRoaXMuX2VtaXREZWxpdmVyeVN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgICAgLmNhdGNoKHRoaXMuX2VtaXREZWxpdmVyeUZhaWx1cmUuYmluZCh0aGlzKSk7XG4gICAgfTtcbiAgfVxuXG4gIF9lbWl0RGVsaXZlcnlTdWNjZXNzKHJlc3VsdCkge1xuICAgIHRoaXMuX2VtaXR0ZXIuZW1pdCgncmVzb2x2ZScsIHJlc3VsdCk7XG4gIH1cblxuICBfZW1pdERlbGl2ZXJ5RmFpbHVyZShlcnJvcikge1xuICAgIHRoaXMuX2VtaXR0ZXIuZW1pdCgncmVqZWN0JywgZXJyb3IpO1xuICB9XG5cbiAgX3ZhbGlkYXRlUGFyYW1zKHBhcmFtcykge1xuICAgIGlmICghcGFyYW1zLmZheE51bWJlcilcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBhcmd1bWVudDogZmF4TnVtYmVyJyk7XG5cbiAgICBpZiAoIXBhcmFtcy5maWxlICYmICFwYXJhbXMuZmlsZXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXJndW1lbnQ6IGZpbGUgb3IgZmlsZXMnKTtcblxuICAgIGxldCBmaWxlcyA9IFtwYXJhbXMuZmlsZSB8fCBwYXJhbXMuZmlsZXNdO1xuICAgIGZpbGVzID0gdGhpcy5fZmxhdHRlbihmaWxlcyk7XG5cbiAgICBkZWxldGUgcGFyYW1zWydmaWxlJ107XG4gICAgZGVsZXRlIHBhcmFtc1snZmlsZXMnXTtcblxuICAgIHJldHVybiBbcGFyYW1zLCBmaWxlc107XG4gIH1cblxuICBfZ2VuZXJhdGVGaWxlT2JqZWN0cyhmaWxlcywgY2FsbGJhY2spIHtcbiAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgICAgbGV0IG9iamVjdCA9IGZpbGU7XG4gICAgICBpZiAodHlwZW9mKGZpbGUpID09PSAnc3RyaW5nJykge1xuICAgICAgICBvYmplY3QgPSBuZXcgRmlsZSh0aGlzLl9kb2N1bWVudHMsIGZpbGUpO1xuICAgICAgfVxuICAgICAgb2JqZWN0Lm9uUmVhZHkoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmICghb2JqZWN0LnJlYWR5KSB7IGNhbGxiYWNrKHJlc3BvbnNlLCBudWxsKTsgfVxuICAgICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID09IGZpbGVzLmxlbmd0aCkgeyBjYWxsYmFjayhudWxsLCBvYmplY3RzKTsgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX2JvZHlGb3IoZmlsZXMpIHtcbiAgICBsZXQgcGFydHMgPSBmaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICBsZXQgZWxlbWVudHMgPSBbYC0tJHt0aGlzLl9ib3VuZGFyeX1gLCAnXFxyXFxuJywgZmlsZS5oZWFkZXIsICdcXHJcXG5cXHJcXG4nXTtcbiAgICAgIGlmIChmaWxlLmJvZHkpIHtcbiAgICAgICAgZWxlbWVudHMucHVzaChmaWxlLmJvZHkpO1xuICAgICAgICBlbGVtZW50cy5wdXNoKCdcXHJcXG5cXHJcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICB9KTtcbiAgICBwYXJ0cy5wdXNoKGAtLSR7dGhpcy5fYm91bmRhcnl9LS1gKTtcbiAgICByZXR1cm4gdGhpcy5fZmxhdHRlbihwYXJ0cyk7XG4gIH1cblxuICBfbGVuZ3RoRm9yKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLnJlZHVjZSgocHJldiwgY3VyKSA9PiB7XG4gICAgICByZXR1cm4gcHJldiArIEJ1ZmZlci5ieXRlTGVuZ3RoKGN1cik7XG4gICAgfSwgMCk7XG4gIH1cblxuICBfZmxhdHRlbihsaXN0KSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgbGlzdCk7XG4gIH1cblxuICBfcHJvbWlzZShjYWxsYmFjaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9lbWl0dGVyLm9uKCdyZXNvbHZlJywgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7IH1cbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VtaXR0ZXIub24oJ3JlamVjdCcsIChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2soZXJyb3IsIG51bGwpOyB9XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWxpdmVyeTtcbiJdfQ==