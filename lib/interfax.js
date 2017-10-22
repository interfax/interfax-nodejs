'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _outbound = require('./outbound');

var _outbound2 = _interopRequireDefault(_outbound);

var _inbound = require('./inbound');

var _inbound2 = _interopRequireDefault(_inbound);

var _documents = require('./documents');

var _documents2 = _interopRequireDefault(_documents);

var _files = require('./files');

var _files2 = _interopRequireDefault(_files);

var _delivery = require('./delivery');

var _delivery2 = _interopRequireDefault(_delivery);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InterFAX = function InterFAX(credentials, debug) {
  _classCallCheck(this, InterFAX);

  this._client = new _client2.default(_https2.default, credentials, _package2.default.version, debug);
  this.documents = new _documents2.default(this._client);
  this._delivery = new _delivery2.default(this._client, this.documents);

  this.outbound = new _outbound2.default(this._client, this._delivery);
  this.deliver = this._delivery.deliver.bind(this._delivery);

  this.account = new _account2.default(this._client);
  this.inbound = new _inbound2.default(this._client);
  this.files = new _files2.default(this.documents);
};

exports.default = InterFAX;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmZheC5qcyJdLCJuYW1lcyI6WyJJbnRlckZBWCIsImNyZWRlbnRpYWxzIiwiZGVidWciLCJfY2xpZW50IiwidmVyc2lvbiIsImRvY3VtZW50cyIsIl9kZWxpdmVyeSIsIm91dGJvdW5kIiwiZGVsaXZlciIsImJpbmQiLCJhY2NvdW50IiwiaW5ib3VuZCIsImZpbGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBR01BLFEsR0FFSixrQkFBWUMsV0FBWixFQUF5QkMsS0FBekIsRUFBZ0M7QUFBQTs7QUFDOUIsT0FBS0MsT0FBTCxHQUFtQixzQ0FBa0JGLFdBQWxCLEVBQStCLGtCQUFRRyxPQUF2QyxFQUFnREYsS0FBaEQsQ0FBbkI7QUFDQSxPQUFLRyxTQUFMLEdBQWlCLHdCQUFjLEtBQUtGLE9BQW5CLENBQWpCO0FBQ0EsT0FBS0csU0FBTCxHQUFtQix1QkFBYSxLQUFLSCxPQUFsQixFQUEyQixLQUFLRSxTQUFoQyxDQUFuQjs7QUFFQSxPQUFLRSxRQUFMLEdBQWlCLHVCQUFhLEtBQUtKLE9BQWxCLEVBQTJCLEtBQUtHLFNBQWhDLENBQWpCO0FBQ0EsT0FBS0UsT0FBTCxHQUFpQixLQUFLRixTQUFMLENBQWVFLE9BQWYsQ0FBdUJDLElBQXZCLENBQTRCLEtBQUtILFNBQWpDLENBQWpCOztBQUVBLE9BQUtJLE9BQUwsR0FBaUIsc0JBQVksS0FBS1AsT0FBakIsQ0FBakI7QUFDQSxPQUFLUSxPQUFMLEdBQWlCLHNCQUFZLEtBQUtSLE9BQWpCLENBQWpCO0FBQ0EsT0FBS1MsS0FBTCxHQUFpQixvQkFBVSxLQUFLUCxTQUFmLENBQWpCO0FBQ0QsQzs7a0JBR1lMLFEiLCJmaWxlIjoiaW50ZXJmYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWNjb3VudCAgICAgZnJvbSAnLi9hY2NvdW50JztcbmltcG9ydCBDbGllbnQgICAgICBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgT3V0Ym91bmQgICAgZnJvbSAnLi9vdXRib3VuZCc7XG5pbXBvcnQgSW5ib3VuZCAgICAgZnJvbSAnLi9pbmJvdW5kJztcbmltcG9ydCBEb2N1bWVudHMgICBmcm9tICcuL2RvY3VtZW50cyc7XG5pbXBvcnQgRmlsZXMgICAgICAgZnJvbSAnLi9maWxlcyc7XG5pbXBvcnQgRGVsaXZlcnkgICAgZnJvbSAnLi9kZWxpdmVyeSc7XG5cbmltcG9ydCBsaWJyYXJ5ICAgICBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IGh0dHBzICAgICAgIGZyb20gJ2h0dHBzJztcblxuXG5jbGFzcyBJbnRlckZBWCB7XG5cbiAgY29uc3RydWN0b3IoY3JlZGVudGlhbHMsIGRlYnVnKSB7XG4gICAgdGhpcy5fY2xpZW50ICAgICA9IG5ldyBDbGllbnQoaHR0cHMsIGNyZWRlbnRpYWxzLCBsaWJyYXJ5LnZlcnNpb24sIGRlYnVnKTtcbiAgICB0aGlzLmRvY3VtZW50cyA9IG5ldyBEb2N1bWVudHModGhpcy5fY2xpZW50KTtcbiAgICB0aGlzLl9kZWxpdmVyeSAgID0gbmV3IERlbGl2ZXJ5KHRoaXMuX2NsaWVudCwgdGhpcy5kb2N1bWVudHMpO1xuXG4gICAgdGhpcy5vdXRib3VuZCAgPSBuZXcgT3V0Ym91bmQodGhpcy5fY2xpZW50LCB0aGlzLl9kZWxpdmVyeSk7XG4gICAgdGhpcy5kZWxpdmVyICAgPSB0aGlzLl9kZWxpdmVyeS5kZWxpdmVyLmJpbmQodGhpcy5fZGVsaXZlcnkpO1xuXG4gICAgdGhpcy5hY2NvdW50ICAgPSBuZXcgQWNjb3VudCh0aGlzLl9jbGllbnQpO1xuICAgIHRoaXMuaW5ib3VuZCAgID0gbmV3IEluYm91bmQodGhpcy5fY2xpZW50KTtcbiAgICB0aGlzLmZpbGVzICAgICA9IG5ldyBGaWxlcyh0aGlzLmRvY3VtZW50cyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJGQVg7XG4iXX0=