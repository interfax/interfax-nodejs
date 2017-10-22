'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  function File(documents, location, options) {
    _classCallCheck(this, File);

    this._documents = documents;
    this.ready = false;
    this._callbacks = [];

    options = options || {};
    this._chunkSize = options.chunkSize || 1024 * 1024;

    if (options.mimeType) {
      this.initializeBinary(location, options.mimeType);
    } else if (location.startsWith('http://') || location.startsWith('https://')) {
      this.initializeUrl(location);
    } else {
      this.initializePath(location);
    }
  }

  _createClass(File, [{
    key: 'onReady',
    value: function onReady(callback) {
      if (this.ready) return callback(this.ready);
      this._callbacks.push(callback);
    }
  }, {
    key: 'initializeBinary',
    value: function initializeBinary(data, mimeType) {
      if (data.length > this._chunkSize) {
        return this.initializeDocument(data, mimeType);
      }

      this.header = 'Content-Type: ' + mimeType;
      this.body = data;
      this._triggerReady(true);
    }
  }, {
    key: 'initializeUrl',
    value: function initializeUrl(url) {
      this.header = 'Content-Location: ' + url;
      this.body = null;
      this._triggerReady(true);
    }
  }, {
    key: 'initializePath',
    value: function initializePath(path) {
      var data = _fs2.default.readFileSync(path);
      var mimeType = _mime2.default.lookup(path);

      this.initializeBinary(data, mimeType);
    }
  }, {
    key: 'initializeDocument',
    value: function initializeDocument(data, mimeType) {
      var extension = _mime2.default.extension(mimeType);
      var filename = 'upload-' + Date.now() + '.' + extension;

      this._documents.create(filename, data.length).then(this._startUpload(data).bind(this)).catch(this._triggerReady.bind(this));
    }
  }, {
    key: '_startUpload',
    value: function _startUpload(data) {
      var _this = this;

      return function (document) {
        _this.header = 'Content-Location: ' + document.url;
        _this.body = null;

        _this._upload(0, document, data)();
      };
    }
  }, {
    key: '_upload',
    value: function _upload(cursor, document, data) {
      var _this2 = this;

      var finished = cursor >= data.length;

      return function () {
        if (finished) {
          return _this2._triggerReady(true);
        }

        var chunk = data.slice(cursor, cursor + _this2._chunkSize);
        var nextCursor = cursor + Buffer.byteLength(chunk);

        return _this2._documents.upload(document.id, cursor, nextCursor - 1, chunk).then(_this2._upload(nextCursor, document, data).bind(_this2)).catch(_this2._triggerReady.bind(_this2));
      };
    }
  }, {
    key: '_triggerReady',
    value: function _triggerReady(response) {
      this.ready = response === true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback(response);
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

      return this.ready;
    }
  }]);

  return File;
}();

exports.default = File;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkb2N1bWVudHMiLCJsb2NhdGlvbiIsIm9wdGlvbnMiLCJfZG9jdW1lbnRzIiwicmVhZHkiLCJfY2FsbGJhY2tzIiwiX2NodW5rU2l6ZSIsImNodW5rU2l6ZSIsIm1pbWVUeXBlIiwiaW5pdGlhbGl6ZUJpbmFyeSIsInN0YXJ0c1dpdGgiLCJpbml0aWFsaXplVXJsIiwiaW5pdGlhbGl6ZVBhdGgiLCJjYWxsYmFjayIsInB1c2giLCJkYXRhIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZURvY3VtZW50IiwiaGVhZGVyIiwiYm9keSIsIl90cmlnZ2VyUmVhZHkiLCJ1cmwiLCJwYXRoIiwicmVhZEZpbGVTeW5jIiwibG9va3VwIiwiZXh0ZW5zaW9uIiwiZmlsZW5hbWUiLCJEYXRlIiwibm93IiwiY3JlYXRlIiwidGhlbiIsIl9zdGFydFVwbG9hZCIsImJpbmQiLCJjYXRjaCIsImRvY3VtZW50IiwiX3VwbG9hZCIsImN1cnNvciIsImZpbmlzaGVkIiwiY2h1bmsiLCJzbGljZSIsIm5leHRDdXJzb3IiLCJCdWZmZXIiLCJieXRlTGVuZ3RoIiwidXBsb2FkIiwiaWQiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxJO0FBQ0osZ0JBQVlDLFNBQVosRUFBdUJDLFFBQXZCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUFBOztBQUN4QyxTQUFLQyxVQUFMLEdBQWtCSCxTQUFsQjtBQUNBLFNBQUtJLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQUgsY0FBVUEsV0FBVyxFQUFyQjtBQUNBLFNBQUtJLFVBQUwsR0FBa0JKLFFBQVFLLFNBQVIsSUFBcUIsT0FBSyxJQUE1Qzs7QUFFQSxRQUFJTCxRQUFRTSxRQUFaLEVBQXNCO0FBQ3BCLFdBQUtDLGdCQUFMLENBQXNCUixRQUF0QixFQUFnQ0MsUUFBUU0sUUFBeEM7QUFDRCxLQUZE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VEQ7QUFVRDs7O2tDQUVhYSxRLEVBQVU7QUFDdEIsV0FBS3pDLEtBQUwsR0FBY3lDLGFBQWEsSUFBM0I7QUFEc0I7QUFBQTtBQUFBOztBQUFBO0FBRXRCLDZCQUFxQixLQUFLeEMsVUFBMUIsOEhBQXNDO0FBQUEsY0FBN0JRLFFBQTZCOztBQUNwQ0EsbUJBQVNnQyxRQUFUO0FBQ0Q7QUFKcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLdEIsYUFBTyxLQUFLekMsS0FBWjtBQUNEOzs7Ozs7a0JBR1lMLEkiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyAgIGZyb20gJ2ZzJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUnO1xuXG5jbGFzcyBGaWxlIHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnRzLCBsb2NhdGlvbiwgb3B0aW9ucykge1xuICAgIHRoaXMuX2RvY3VtZW50cyA9IGRvY3VtZW50cztcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9jaHVua1NpemUgPSBvcHRpb25zLmNodW5rU2l6ZSB8fCAxMDI0KjEwMjQ7XG5cbiAgICBpZiAob3B0aW9ucy5taW1lVHlwZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplQmluYXJ5KGxvY2F0aW9uLCBvcHRpb25zLm1pbWVUeXBlKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKSB8fCBsb2NhdGlvbi5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVVcmwobG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVQYXRoKGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBvblJlYWR5KGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMucmVhZHkpIHJldHVybiBjYWxsYmFjayh0aGlzLnJlYWR5KTtcbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICBpbml0aWFsaXplQmluYXJ5KGRhdGEsIG1pbWVUeXBlKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID4gdGhpcy5fY2h1bmtTaXplKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplRG9jdW1lbnQoZGF0YSwgbWltZVR5cGUpO1xuICAgIH1cblxuICAgIHRoaXMuaGVhZGVyID0gYENvbnRlbnQtVHlwZTogJHttaW1lVHlwZX1gO1xuICAgIHRoaXMuYm9keSAgID0gZGF0YTtcbiAgICB0aGlzLl90cmlnZ2VyUmVhZHkodHJ1ZSk7XG4gIH1cblxuICBpbml0aWFsaXplVXJsKHVybCkge1xuICAgIHRoaXMuaGVhZGVyID0gYENvbnRlbnQtTG9jYXRpb246ICR7dXJsfWA7XG4gICAgdGhpcy5ib2R5ICAgPSBudWxsO1xuICAgIHRoaXMuX3RyaWdnZXJSZWFkeSh0cnVlKTtcbiAgfVxuXG4gIGluaXRpYWxpemVQYXRoKHBhdGgpIHtcbiAgICBsZXQgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoKTtcbiAgICBsZXQgbWltZVR5cGUgPSBtaW1lLmxvb2t1cChwYXRoKTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUJpbmFyeShkYXRhLCBtaW1lVHlwZSk7XG4gIH1cblxuICBpbml0aWFsaXplRG9jdW1lbnQoZGF0YSwgbWltZVR5cGUpIHtcbiAgICBsZXQgZXh0ZW5zaW9uID0gbWltZS5leHRlbnNpb24obWltZVR5cGUpO1xuICAgIGxldCBmaWxlbmFtZSA9IGB1cGxvYWQtJHtEYXRlLm5vdygpfS4ke2V4dGVuc2lvbn1gO1xuXG4gICAgdGhpcy5fZG9jdW1lbnRzLmNyZWF0ZShmaWxlbmFtZSwgZGF0YS5sZW5ndGgpXG4gICAgICAudGhlbih0aGlzLl9zdGFydFVwbG9hZChkYXRhKS5iaW5kKHRoaXMpKVxuICAgICAgLmNhdGNoKHRoaXMuX3RyaWdnZXJSZWFkeS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9zdGFydFVwbG9hZChkYXRhKSB7XG4gICAgcmV0dXJuIChkb2N1bWVudCkgPT4ge1xuICAgICAgdGhpcy5oZWFkZXIgPSBgQ29udGVudC1Mb2NhdGlvbjogJHtkb2N1bWVudC51cmx9YDtcbiAgICAgIHRoaXMuYm9keSA9IG51bGw7XG5cbiAgICAgIHRoaXMuX3VwbG9hZCgwLCBkb2N1bWVudCwgZGF0YSkoKTtcbiAgICB9O1xuICB9XG5cbiAgX3VwbG9hZChjdXJzb3IsIGRvY3VtZW50LCBkYXRhKSB7XG4gICAgbGV0IGZpbmlzaGVkID0gKGN1cnNvciA+PSBkYXRhLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGZpbmlzaGVkKSB7IHJldHVybiB0aGlzLl90cmlnZ2VyUmVhZHkodHJ1ZSk7IH1cblxuICAgICAgbGV0IGNodW5rID0gZGF0YS5zbGljZShjdXJzb3IsIGN1cnNvcit0aGlzLl9jaHVua1NpemUpO1xuICAgICAgbGV0IG5leHRDdXJzb3IgPSBjdXJzb3IrQnVmZmVyLmJ5dGVMZW5ndGgoY2h1bmspO1xuXG4gICAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRzLnVwbG9hZChkb2N1bWVudC5pZCwgY3Vyc29yLCBuZXh0Q3Vyc29yLTEsIGNodW5rKVxuICAgICAgICAudGhlbih0aGlzLl91cGxvYWQobmV4dEN1cnNvciwgZG9jdW1lbnQsIGRhdGEpLmJpbmQodGhpcykpXG4gICAgICAgIC5jYXRjaCh0aGlzLl90cmlnZ2VyUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgfTtcbiAgfVxuICBcbiAgX3RyaWdnZXJSZWFkeShyZXNwb25zZSkge1xuICAgIHRoaXMucmVhZHkgPSAocmVzcG9uc2UgPT09IHRydWUpO1xuICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWFkeTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlO1xuIl19