'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inbound = function () {
  function Inbound(client) {
    _classCallCheck(this, Inbound);

    this._client = client;
  }

  _createClass(Inbound, [{
    key: 'all',
    value: function all(params, callback) {
      return this._client.get('/inbound/faxes', params, callback);
    }
  }, {
    key: 'find',
    value: function find(id, callback) {
      return this._client.get('/inbound/faxes/' + id, callback);
    }
  }, {
    key: 'image',
    value: function image(id, callback) {
      return this._client.get('/inbound/faxes/' + id + '/image', callback);
    }
  }, {
    key: 'emails',
    value: function emails(id, callback) {
      return this._client.get('/inbound/faxes/' + id + '/emails', callback);
    }
  }, {
    key: 'mark',
    value: function mark(id, is_read, callback) {
      return this._client.post('/inbound/faxes/' + id + '/mark', { unread: !is_read }, callback);
    }
  }, {
    key: 'resend',
    value: function resend(id, email, callback) {
      var options = {};
      if (typeof email === 'string') {
        options.email = email;
      } else if (typeof email === 'function') {
        callback = email;
      }
      return this._client.post('/inbound/faxes/' + id + '/resend', options, callback);
    }
  }]);

  return Inbound;
}();

exports.default = Inbound;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmJvdW5kLmpzIl0sIm5hbWVzIjpbIkluYm91bmQiLCJjbGllbnQiLCJfY2xpZW50IiwicGFyYW1zIiwiY2FsbGJhY2siLCJnZXQiLCJpZCIsImlzX3JlYWQiLCJwb3N0IiwidW5yZWFkIiwiZW1haWwiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE87QUFDSixtQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7Ozt3QkFFR0UsTSxFQUFRQyxRLEVBQVU7QUFDcEIsYUFBTyxLQUFLRixPQUFMLENBQWFHLEdBQWIsQ0FBaUIsZ0JBQWpCLEVBQW1DRixNQUFuQyxFQUEyQ0MsUUFBM0MsQ0FBUDtBQUNEOzs7eUJBRUlFLEUsRUFBSUYsUSxFQUFVO0FBQ2pCLGFBQU8sS0FBS0YsT0FBTCxDQUFhRyxHQUFiLHFCQUFtQ0MsRUFBbkMsRUFBeUNGLFFBQXpDLENBQVA7QUFDRDs7OzBCQUVLRSxFLEVBQUlGLFEsRUFBVTtBQUNsQixhQUFPLEtBQUtGLE9BQUwsQ0FBYUcsR0FBYixxQkFBbUNDLEVBQW5DLGFBQStDRixRQUEvQyxDQUFQO0FBQ0Q7OzsyQkFFTUUsRSxFQUFJRixRLEVBQVU7QUFDbkIsYUFBTyxLQUFLRixPQUFMLENBQWFHLEdBQWIscUJBQW1DQyxFQUFuQyxjQUFnREYsUUFBaEQsQ0FBUDtBQUNEOzs7eUJBRUlFLEUsRUFBSUMsTyxFQUFTSCxRLEVBQVU7QUFDMUIsYUFBTyxLQUFLRixPQUFMLENBQWFNLElBQWIscUJBQW9DRixFQUFwQyxZQUErQyxFQUFFRyxRQUFRLENBQUNGLE9BQVgsRUFBL0MsRUFBcUVILFFBQXJFLENBQVA7QUFDRDs7OzJCQUVNRSxFLEVBQUlJLEssRUFBT04sUSxFQUFVO0FBQzFCLFVBQUlPLFVBQVUsRUFBZDtBQUNBLFVBQUksT0FBT0QsS0FBUCxLQUFrQixRQUF0QixFQUFnQztBQUFFQyxnQkFBUUQsS0FBUixHQUFnQkEsS0FBaEI7QUFBd0IsT0FBMUQsTUFDSyxJQUFHLE9BQU9BLEtBQVAsS0FBa0IsVUFBckIsRUFBaUM7QUFBRU4sbUJBQVdNLEtBQVg7QUFBbUI7QUFDM0QsYUFBTyxLQUFLUixPQUFMLENBQWFNLElBQWIscUJBQW9DRixFQUFwQyxjQUFpREssT0FBakQsRUFBMERQLFFBQTFELENBQVA7QUFDRDs7Ozs7O2tCQUdZSixPIiwiZmlsZSI6ImluYm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBJbmJvdW5kIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB9XG5cbiAgYWxsKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmdldCgnL2luYm91bmQvZmF4ZXMnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZpbmQoaWQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5nZXQoYC9pbmJvdW5kL2ZheGVzLyR7aWR9YCwgY2FsbGJhY2spO1xuICB9XG5cbiAgaW1hZ2UoaWQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5nZXQoYC9pbmJvdW5kL2ZheGVzLyR7aWR9L2ltYWdlYCwgY2FsbGJhY2spO1xuICB9XG5cbiAgZW1haWxzKGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZ2V0KGAvaW5ib3VuZC9mYXhlcy8ke2lkfS9lbWFpbHNgLCBjYWxsYmFjayk7XG4gIH1cblxuICBtYXJrKGlkLCBpc19yZWFkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQucG9zdChgL2luYm91bmQvZmF4ZXMvJHtpZH0vbWFya2AsIHsgdW5yZWFkOiAhaXNfcmVhZCB9LCBjYWxsYmFjayk7XG4gIH1cblxuICByZXNlbmQoaWQsIGVtYWlsLCBjYWxsYmFjaykge1xuICAgIGxldCBvcHRpb25zID0ge307XG4gICAgaWYgKHR5cGVvZihlbWFpbCkgPT09ICdzdHJpbmcnKSB7IG9wdGlvbnMuZW1haWwgPSBlbWFpbDsgfVxuICAgIGVsc2UgaWYodHlwZW9mKGVtYWlsKSA9PT0gJ2Z1bmN0aW9uJykgeyBjYWxsYmFjayA9IGVtYWlsOyB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5wb3N0KGAvaW5ib3VuZC9mYXhlcy8ke2lkfS9yZXNlbmRgLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5ib3VuZDtcbiJdfQ==