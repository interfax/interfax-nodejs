'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Outbound = function () {
  function Outbound(client, delivery) {
    _classCallCheck(this, Outbound);

    this._client = client;
    this._delivery = delivery;
  }

  _createClass(Outbound, [{
    key: 'deliver',
    value: function deliver(params, callback) {
      return this._delivery.deliver(params, callback);
    }
  }, {
    key: 'all',
    value: function all(params, callback) {
      return this._client.get('/outbound/faxes', params, callback);
    }
  }, {
    key: 'completed',
    value: function completed(ids, callback) {
      return this._client.get('/outbound/faxes/completed', { 'ids': ids }, callback);
    }
  }, {
    key: 'find',
    value: function find(id, callback) {
      return this._client.get('/outbound/faxes/' + id, callback);
    }
  }, {
    key: 'image',
    value: function image(id, callback) {
      return this._client.get('/outbound/faxes/' + id + '/image', callback);
    }
  }, {
    key: 'cancel',
    value: function cancel(id, callback) {
      return this._client.post('/outbound/faxes/' + id + '/cancel', callback);
    }
  }, {
    key: 'search',
    value: function search(params, callback) {
      return this._client.get('/outbound/search', params, callback);
    }
  }]);

  return Outbound;
}();

exports.default = Outbound;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vdXRib3VuZC5qcyJdLCJuYW1lcyI6WyJPdXRib3VuZCIsImNsaWVudCIsImRlbGl2ZXJ5IiwiX2NsaWVudCIsIl9kZWxpdmVyeSIsInBhcmFtcyIsImNhbGxiYWNrIiwiZGVsaXZlciIsImdldCIsImlkcyIsImlkIiwicG9zdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxRO0FBQ0osb0JBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCO0FBQUE7O0FBQzVCLFNBQUtDLE9BQUwsR0FBZUYsTUFBZjtBQUNBLFNBQUtHLFNBQUwsR0FBaUJGLFFBQWpCO0FBQ0Q7Ozs7NEJBRU9HLE0sRUFBUUMsUSxFQUFVO0FBQ3hCLGFBQU8sS0FBS0YsU0FBTCxDQUFlRyxPQUFmLENBQXVCRixNQUF2QixFQUErQkMsUUFBL0IsQ0FBUDtBQUNEOzs7d0JBRUdELE0sRUFBUUMsUSxFQUFVO0FBQ3BCLGFBQU8sS0FBS0gsT0FBTCxDQUFhSyxHQUFiLENBQWlCLGlCQUFqQixFQUFvQ0gsTUFBcEMsRUFBNENDLFFBQTVDLENBQVA7QUFDRDs7OzhCQUVTRyxHLEVBQUtILFEsRUFBVTtBQUN2QixhQUFPLEtBQUtILE9BQUwsQ0FBYUssR0FBYixDQUFpQiwyQkFBakIsRUFBOEMsRUFBRSxPQUFRQyxHQUFWLEVBQTlDLEVBQStESCxRQUEvRCxDQUFQO0FBQ0Q7Ozt5QkFFSUksRSxFQUFJSixRLEVBQVU7QUFDakIsYUFBTyxLQUFLSCxPQUFMLENBQWFLLEdBQWIsc0JBQW9DRSxFQUFwQyxFQUEwQ0osUUFBMUMsQ0FBUDtBQUNEOzs7MEJBRUtJLEUsRUFBSUosUSxFQUFVO0FBQ2xCLGFBQU8sS0FBS0gsT0FBTCxDQUFhSyxHQUFiLHNCQUFvQ0UsRUFBcEMsYUFBZ0RKLFFBQWhELENBQVA7QUFDRDs7OzJCQUVNSSxFLEVBQUlKLFEsRUFBVTtBQUNuQixhQUFPLEtBQUtILE9BQUwsQ0FBYVEsSUFBYixzQkFBcUNELEVBQXJDLGNBQWtESixRQUFsRCxDQUFQO0FBQ0Q7OzsyQkFFTUQsTSxFQUFRQyxRLEVBQVU7QUFDdkIsYUFBTyxLQUFLSCxPQUFMLENBQWFLLEdBQWIsQ0FBaUIsa0JBQWpCLEVBQXFDSCxNQUFyQyxFQUE2Q0MsUUFBN0MsQ0FBUDtBQUNEOzs7Ozs7a0JBR1lOLFEiLCJmaWxlIjoib3V0Ym91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBPdXRib3VuZCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgZGVsaXZlcnkpIHtcbiAgICB0aGlzLl9jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5fZGVsaXZlcnkgPSBkZWxpdmVyeTtcbiAgfVxuXG4gIGRlbGl2ZXIocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9kZWxpdmVyeS5kZWxpdmVyKHBhcmFtcywgY2FsbGJhY2spO1xuICB9XG5cbiAgYWxsKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmdldCgnL291dGJvdW5kL2ZheGVzJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH1cblxuICBjb21wbGV0ZWQoaWRzLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZ2V0KCcvb3V0Ym91bmQvZmF4ZXMvY29tcGxldGVkJywgeyAnaWRzJyA6IGlkcyB9LCBjYWxsYmFjayk7XG4gIH1cblxuICBmaW5kKGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZ2V0KGAvb3V0Ym91bmQvZmF4ZXMvJHtpZH1gLCBjYWxsYmFjayk7XG4gIH1cblxuICBpbWFnZShpZCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmdldChgL291dGJvdW5kL2ZheGVzLyR7aWR9L2ltYWdlYCwgY2FsbGJhY2spO1xuICB9XG5cbiAgY2FuY2VsKGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQucG9zdChgL291dGJvdW5kL2ZheGVzLyR7aWR9L2NhbmNlbGAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNlYXJjaChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5nZXQoJy9vdXRib3VuZC9zZWFyY2gnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPdXRib3VuZDtcbiJdfQ==