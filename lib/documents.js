'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Documents = function () {
  function Documents(client) {
    _classCallCheck(this, Documents);

    this._client = client;
  }

  _createClass(Documents, [{
    key: 'create',
    value: function create(filename, file_size, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      options.name = filename;
      options.size = file_size;

      return this._client.post('/outbound/documents', options, callback);
    }
  }, {
    key: 'all',
    value: function all(params, callback) {
      return this._client.get('/outbound/documents', params, callback);
    }
  }, {
    key: 'find',
    value: function find(id, callback) {
      return this._client.get('/outbound/documents/' + id, callback);
    }
  }, {
    key: 'cancel',
    value: function cancel(id, callback) {
      return this._client.delete('/outbound/documents/' + id, callback);
    }
  }, {
    key: 'upload',
    value: function upload(id, range_start, range_end, chunk, callback) {
      var headers = { 'Range': 'bytes=' + range_start + '-' + range_end };
      return this._client.request('POST', '/outbound/documents/' + id, headers, chunk, {}, callback);
    }
  }]);

  return Documents;
}();

exports.default = Documents;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudHMuanMiXSwibmFtZXMiOlsiRG9jdW1lbnRzIiwiY2xpZW50IiwiX2NsaWVudCIsImZpbGVuYW1lIiwiZmlsZV9zaXplIiwib3B0aW9ucyIsImNhbGxiYWNrIiwibmFtZSIsInNpemUiLCJwb3N0IiwicGFyYW1zIiwiZ2V0IiwiaWQiLCJkZWxldGUiLCJyYW5nZV9zdGFydCIsInJhbmdlX2VuZCIsImNodW5rIiwiaGVhZGVycyIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsUztBQUVKLHFCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUNEOzs7OzJCQUVNRSxRLEVBQVVDLFMsRUFBV0MsTyxFQUFTQyxRLEVBQVU7QUFDN0MsVUFBSSxPQUFPRCxPQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2xDQyxtQkFBV0QsT0FBWDtBQUNBQSxrQkFBVSxFQUFWO0FBQ0Q7QUFDREEsZ0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsY0FBUUUsSUFBUixHQUFlSixRQUFmO0FBQ0FFLGNBQVFHLElBQVIsR0FBZUosU0FBZjs7QUFFQSxhQUFPLEtBQUtGLE9BQUwsQ0FBYU8sSUFBYixDQUFrQixxQkFBbEIsRUFBeUNKLE9BQXpDLEVBQWtEQyxRQUFsRCxDQUFQO0FBQ0Q7Ozt3QkFFR0ksTSxFQUFRSixRLEVBQVU7QUFDcEIsYUFBTyxLQUFLSixPQUFMLENBQWFTLEdBQWIsQ0FBaUIscUJBQWpCLEVBQXdDRCxNQUF4QyxFQUFnREosUUFBaEQsQ0FBUDtBQUNEOzs7eUJBRUlNLEUsRUFBSU4sUSxFQUFVO0FBQ2pCLGFBQU8sS0FBS0osT0FBTCxDQUFhUyxHQUFiLDBCQUF3Q0MsRUFBeEMsRUFBOENOLFFBQTlDLENBQVA7QUFDRDs7OzJCQUVNTSxFLEVBQUlOLFEsRUFBVTtBQUNuQixhQUFPLEtBQUtKLE9BQUwsQ0FBYVcsTUFBYiwwQkFBMkNELEVBQTNDLEVBQWlETixRQUFqRCxDQUFQO0FBQ0Q7OzsyQkFFTU0sRSxFQUFJRSxXLEVBQWFDLFMsRUFBV0MsSyxFQUFPVixRLEVBQVU7QUFDbEQsVUFBSVcsVUFBVSxFQUFFLG9CQUFrQkgsV0FBbEIsU0FBaUNDLFNBQW5DLEVBQWQ7QUFDQSxhQUFPLEtBQUtiLE9BQUwsQ0FBYWdCLE9BQWIsQ0FBcUIsTUFBckIsMkJBQW9ETixFQUFwRCxFQUEwREssT0FBMUQsRUFBbUVELEtBQW5FLEVBQTBFLEVBQTFFLEVBQThFVixRQUE5RSxDQUFQO0FBQ0Q7Ozs7OztrQkFHWU4sUyIsImZpbGUiOiJkb2N1bWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEb2N1bWVudHMge1xuXG4gIGNvbnN0cnVjdG9yKGNsaWVudCkge1xuICAgIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgfVxuXG4gIGNyZWF0ZShmaWxlbmFtZSwgZmlsZV9zaXplLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5uYW1lID0gZmlsZW5hbWU7XG4gICAgb3B0aW9ucy5zaXplID0gZmlsZV9zaXplO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5wb3N0KCcvb3V0Ym91bmQvZG9jdW1lbnRzJywgb3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG5cbiAgYWxsKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmdldCgnL291dGJvdW5kL2RvY3VtZW50cycsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9XG5cbiAgZmluZChpZCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmdldChgL291dGJvdW5kL2RvY3VtZW50cy8ke2lkfWAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNhbmNlbChpZCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmRlbGV0ZShgL291dGJvdW5kL2RvY3VtZW50cy8ke2lkfWAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHVwbG9hZChpZCwgcmFuZ2Vfc3RhcnQsIHJhbmdlX2VuZCwgY2h1bmssIGNhbGxiYWNrKSB7XG4gICAgbGV0IGhlYWRlcnMgPSB7ICdSYW5nZSc6IGBieXRlcz0ke3JhbmdlX3N0YXJ0fS0ke3JhbmdlX2VuZH1gIH07XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5yZXF1ZXN0KCdQT1NUJywgYC9vdXRib3VuZC9kb2N1bWVudHMvJHtpZH1gLCBoZWFkZXJzLCBjaHVuaywge30sIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2N1bWVudHM7XG4iXX0=