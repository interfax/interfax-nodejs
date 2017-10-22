'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
  function Files(documents) {
    _classCallCheck(this, Files);

    this._documents = documents;
  }

  _createClass(Files, [{
    key: 'create',
    value: function create(data, options, callback) {
      var emitter = new _events2.default();
      var promise = this._promise(emitter, callback);

      var file = new _file2.default(this._documents, data, options);
      file.onReady(function (response) {
        if (response === true) {
          emitter.emit('resolve', file);
        } else {
          emitter.emit('reject', response);
        }
      });

      return promise;
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

  return Files;
}();

exports.default = Files;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy5qcyJdLCJuYW1lcyI6WyJGaWxlcyIsImRvY3VtZW50cyIsIl9kb2N1bWVudHMiLCJkYXRhIiwib3B0aW9ucyIsImNhbGxiYWNrIiwiZW1pdHRlciIsInByb21pc2UiLCJfcHJvbWlzZSIsImZpbGUiLCJvblJlYWR5IiwicmVzcG9uc2UiLCJlbWl0IiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OztJQUVNQSxLO0FBQ0osaUJBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0MsVUFBTCxHQUFrQkQsU0FBbEI7QUFDRDs7OzsyQkFFTUUsSSxFQUFNQyxPLEVBQVNDLFEsRUFBVTtBQUM5QixVQUFJQyxVQUFVLHNCQUFkO0FBQ0EsVUFBSUMsVUFBVSxLQUFLQyxRQUFMLENBQWNGLE9BQWQsRUFBdUJELFFBQXZCLENBQWQ7O0FBRUEsVUFBSUksT0FBVSxtQkFBUyxLQUFLUCxVQUFkLEVBQTBCQyxJQUExQixFQUFnQ0MsT0FBaEMsQ0FBZDtBQUNBSyxXQUFLQyxPQUFMLENBQWEsVUFBQ0MsUUFBRCxFQUFjO0FBQ3pCLFlBQUlBLGFBQWEsSUFBakIsRUFBdUI7QUFDckJMLGtCQUFRTSxJQUFSLENBQWEsU0FBYixFQUF3QkgsSUFBeEI7QUFDRCxTQUZELE1BRU87QUFDTEgsa0JBQVFNLElBQVIsQ0FBYSxRQUFiLEVBQXVCRCxRQUF2QjtBQUNEO0FBQ0YsT0FORDs7QUFRQSxhQUFPSixPQUFQO0FBQ0Q7Ozs2QkFFUUQsTyxFQUFTRCxRLEVBQVU7QUFDMUIsYUFBTyx1QkFBWSxVQUFDUSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENSLGdCQUFRUyxFQUFSLENBQVcsU0FBWCxFQUFzQixVQUFDSixRQUFELEVBQWM7QUFDbEMsY0FBSU4sUUFBSixFQUFjO0FBQUVBLHFCQUFTLElBQVQsRUFBZU0sUUFBZjtBQUEyQjtBQUMzQ0Usa0JBQVFGLFFBQVI7QUFDRCxTQUhEO0FBSUFMLGdCQUFRUyxFQUFSLENBQVcsUUFBWCxFQUFxQixVQUFDQyxLQUFELEVBQVc7QUFDOUIsY0FBSVgsUUFBSixFQUFjO0FBQUVBLHFCQUFTVyxLQUFULEVBQWdCLElBQWhCO0FBQXdCO0FBQ3hDRixpQkFBT0UsS0FBUDtBQUNELFNBSEQ7QUFJRCxPQVRNLENBQVA7QUFVRDs7Ozs7O2tCQUdZaEIsSyIsImZpbGUiOiJmaWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlICAgICAgICAgIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgICAgIGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSc7XG5cbmNsYXNzIEZpbGVzIHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnRzKSB7XG4gICAgdGhpcy5fZG9jdW1lbnRzID0gZG9jdW1lbnRzO1xuICB9XG5cbiAgY3JlYXRlKGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgbGV0IHByb21pc2UgPSB0aGlzLl9wcm9taXNlKGVtaXR0ZXIsIGNhbGxiYWNrKTtcblxuICAgIGxldCBmaWxlICAgID0gbmV3IEZpbGUodGhpcy5fZG9jdW1lbnRzLCBkYXRhLCBvcHRpb25zKTtcbiAgICBmaWxlLm9uUmVhZHkoKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UgPT09IHRydWUpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdyZXNvbHZlJywgZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ3JlamVjdCcsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgX3Byb21pc2UoZW1pdHRlciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbigncmVzb2x2ZScsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpOyB9XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgICBlbWl0dGVyLm9uKCdyZWplY3QnLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgfVxuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZXM7XG4iXX0=