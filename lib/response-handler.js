'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseHandler = function ResponseHandler(emitter, debug) {
  _classCallCheck(this, ResponseHandler);

  return function (response) {
    if (debug) {
      console.log(response);
    } // eslint-disable-line no-console

    var isJson = response.headers['content-type'] == 'text/json';
    var isTiff = response.headers['content-type'] == 'image/tiff';
    var isPdf = response.headers['content-type'] == 'application/pdf';
    var isImage = isTiff || isPdf;
    var result = isImage ? [] : '';

    var isLocation = response.headers['location'] !== undefined;

    response.on('data', function (chunk) {
      if (isImage) {
        result.push(chunk);
      } else {
        result += chunk;
      }
    });

    response.on('end', function () {
      if (debug) {
        console.log(result);
      } // eslint-disable-line no-console

      if (isLocation) {
        result = new _location2.default(response.headers['location']);
      } else if (isJson && result.length > 0) {
        result = JSON.parse(result);
      } else if (isJson && result.length == 0) {
        result = null;
      } else if (isImage) {
        var data = Buffer.concat(result);
        result = new _image2.default(data, response.headers['content-type']);
      }

      if (response.statusCode >= 300) {
        emitter.emit('reject', result);
      } else {
        emitter.emit('resolve', result);
      }
    });

    response.on('close', function (error) {
      emitter.emit('reject', error);
    });
  };
};

exports.default = ResponseHandler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlSGFuZGxlciIsImVtaXR0ZXIiLCJkZWJ1ZyIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImlzSnNvbiIsImhlYWRlcnMiLCJpc1RpZmYiLCJpc1BkZiIsImlzSW1hZ2UiLCJyZXN1bHQiLCJpc0xvY2F0aW9uIiwidW5kZWZpbmVkIiwib24iLCJjaHVuayIsInB1c2giLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiQnVmZmVyIiwiY29uY2F0Iiwic3RhdHVzQ29kZSIsImVtaXQiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsZSxHQUNKLHlCQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE0QjtBQUFBOztBQUMxQixTQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQixRQUFJRCxLQUFKLEVBQVc7QUFBRUUsY0FBUUMsR0FBUixDQUFZRixRQUFaO0FBQXdCLEtBRGxCLENBQ21COztBQUV0QyxRQUFJRyxTQUFjSCxTQUFTSSxPQUFULENBQWlCLGNBQWpCLEtBQW9DLFdBQXREO0FBQ0EsUUFBSUMsU0FBY0wsU0FBU0ksT0FBVCxDQUFpQixjQUFqQixLQUFvQyxZQUF0RDtBQUNBLFFBQUlFLFFBQWNOLFNBQVNJLE9BQVQsQ0FBaUIsY0FBakIsS0FBb0MsaUJBQXREO0FBQ0EsUUFBSUcsVUFBY0YsVUFBVUMsS0FBNUI7QUFDQSxRQUFJRSxTQUFjRCxVQUFVLEVBQVYsR0FBZSxFQUFqQzs7QUFFQSxRQUFJRSxhQUFjVCxTQUFTSSxPQUFULENBQWlCLFVBQWpCLE1BQWlDTSxTQUFuRDs7QUFFQVYsYUFBU1csRUFBVCxDQUFZLE1BQVosRUFBb0IsVUFBU0MsS0FBVCxFQUFnQjtBQUNsQyxVQUFJTCxPQUFKLEVBQWE7QUFDWEMsZUFBT0ssSUFBUCxDQUFZRCxLQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0xKLGtCQUFVSSxLQUFWO0FBQ0Q7QUFDRixLQU5EOztBQVFBWixhQUFTVyxFQUFULENBQVksS0FBWixFQUFtQixZQUFXO0FBQzVCLFVBQUlaLEtBQUosRUFBVztBQUFFRSxnQkFBUUMsR0FBUixDQUFZTSxNQUFaO0FBQXNCLE9BRFAsQ0FDUTs7QUFFcEMsVUFBSUMsVUFBSixFQUFnQjtBQUFFRCxpQkFBUyx1QkFBYVIsU0FBU0ksT0FBVCxDQUFpQixVQUFqQixDQUFiLENBQVQ7QUFBc0QsT0FBeEUsTUFDSyxJQUFJRCxVQUFVSyxPQUFPTSxNQUFQLEdBQWdCLENBQTlCLEVBQWlDO0FBQUVOLGlCQUFTTyxLQUFLQyxLQUFMLENBQVdSLE1BQVgsQ0FBVDtBQUE4QixPQUFqRSxNQUNBLElBQUlMLFVBQVVLLE9BQU9NLE1BQVAsSUFBaUIsQ0FBL0IsRUFBa0M7QUFBRU4saUJBQVMsSUFBVDtBQUFnQixPQUFwRCxNQUNBLElBQUlELE9BQUosRUFBYTtBQUNoQixZQUFNVSxPQUFPQyxPQUFPQyxNQUFQLENBQWNYLE1BQWQsQ0FBYjtBQUNBQSxpQkFBUyxvQkFBVVMsSUFBVixFQUFnQmpCLFNBQVNJLE9BQVQsQ0FBaUIsY0FBakIsQ0FBaEIsQ0FBVDtBQUNEOztBQUVELFVBQUlKLFNBQVNvQixVQUFULElBQXVCLEdBQTNCLEVBQWdDO0FBQzlCdEIsZ0JBQVF1QixJQUFSLENBQWEsUUFBYixFQUF1QmIsTUFBdkI7QUFDRCxPQUZELE1BRU87QUFDTFYsZ0JBQVF1QixJQUFSLENBQWEsU0FBYixFQUF3QmIsTUFBeEI7QUFDRDtBQUNGLEtBaEJEOztBQWtCQVIsYUFBU1csRUFBVCxDQUFZLE9BQVosRUFBcUIsVUFBU1csS0FBVCxFQUFnQjtBQUNuQ3hCLGNBQVF1QixJQUFSLENBQWEsUUFBYixFQUF1QkMsS0FBdkI7QUFDRCxLQUZEO0FBR0QsR0F4Q0Q7QUF5Q0QsQzs7a0JBR1l6QixlIiwiZmlsZSI6InJlc3BvbnNlLWhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2UgICAgZnJvbSAnLi9pbWFnZSc7XG5pbXBvcnQgTG9jYXRpb24gZnJvbSAnLi9sb2NhdGlvbic7XG5cbmNsYXNzIFJlc3BvbnNlSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIGRlYnVnKSB7XG4gICAgcmV0dXJuIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGRlYnVnKSB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgbGV0IGlzSnNvbiAgICAgID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT0gJ3RleHQvanNvbic7XG4gICAgICBsZXQgaXNUaWZmICAgICAgPSByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9PSAnaW1hZ2UvdGlmZic7XG4gICAgICBsZXQgaXNQZGYgICAgICAgPSByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9PSAnYXBwbGljYXRpb24vcGRmJztcbiAgICAgIGxldCBpc0ltYWdlICAgICA9IGlzVGlmZiB8fCBpc1BkZjtcbiAgICAgIGxldCByZXN1bHQgICAgICA9IGlzSW1hZ2UgPyBbXSA6ICcnO1xuXG4gICAgICBsZXQgaXNMb2NhdGlvbiAgPSByZXNwb25zZS5oZWFkZXJzWydsb2NhdGlvbiddICE9PSB1bmRlZmluZWQ7XG5cbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgZnVuY3Rpb24oY2h1bmspIHtcbiAgICAgICAgaWYgKGlzSW1hZ2UpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChjaHVuayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGNodW5rO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZGVidWcpIHsgY29uc29sZS5sb2cocmVzdWx0KTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgICBpZiAoaXNMb2NhdGlvbikgeyByZXN1bHQgPSBuZXcgTG9jYXRpb24ocmVzcG9uc2UuaGVhZGVyc1snbG9jYXRpb24nXSk7IH1cbiAgICAgICAgZWxzZSBpZiAoaXNKc29uICYmIHJlc3VsdC5sZW5ndGggPiAwKSB7IHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTsgfVxuICAgICAgICBlbHNlIGlmIChpc0pzb24gJiYgcmVzdWx0Lmxlbmd0aCA9PSAwKSB7IHJlc3VsdCA9IG51bGw7IH1cbiAgICAgICAgZWxzZSBpZiAoaXNJbWFnZSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuY29uY2F0KHJlc3VsdCk7XG4gICAgICAgICAgcmVzdWx0ID0gbmV3IEltYWdlKGRhdGEsIHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID49IDMwMCkge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncmVqZWN0JywgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3Jlc29sdmUnLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdyZWplY3QnLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlSGFuZGxlcjtcbiJdfQ==