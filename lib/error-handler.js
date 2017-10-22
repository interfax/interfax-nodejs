'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorHandler = function ErrorHandler(emitter, debug) {
  _classCallCheck(this, ErrorHandler);

  return function (error) {
    if (debug) {
      console.log(error);
    } // eslint-disable-line no-console
    emitter.emit('reject', error);
  };
};

exports.default = ErrorHandler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbIkVycm9ySGFuZGxlciIsImVtaXR0ZXIiLCJkZWJ1ZyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImVtaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLFksR0FDSixzQkFBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBTyxVQUFDQyxLQUFELEVBQVc7QUFDaEIsUUFBSUQsS0FBSixFQUFXO0FBQUVFLGNBQVFDLEdBQVIsQ0FBWUYsS0FBWjtBQUFxQixLQURsQixDQUNtQjtBQUNuQ0YsWUFBUUssSUFBUixDQUFhLFFBQWIsRUFBdUJILEtBQXZCO0FBQ0QsR0FIRDtBQUlELEM7O2tCQUdZSCxZIiwiZmlsZSI6ImVycm9yLWhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBFcnJvckhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyLCBkZWJ1Zykge1xuICAgIHJldHVybiAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChkZWJ1ZykgeyBjb25zb2xlLmxvZyhlcnJvcik7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICBlbWl0dGVyLmVtaXQoJ3JlamVjdCcsIGVycm9yKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9ySGFuZGxlcjtcbiJdfQ==