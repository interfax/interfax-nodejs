'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function Location(url) {
  _classCallCheck(this, Location);

  this.url = url;

  var parts = url.split('/');
  this.id = parts[parts.length - 1];
};

exports.default = Location;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6WyJMb2NhdGlvbiIsInVybCIsInBhcnRzIiwic3BsaXQiLCJpZCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUEsUSxHQUNKLGtCQUFZQyxHQUFaLEVBQWlCO0FBQUE7O0FBQ2YsT0FBS0EsR0FBTCxHQUFXQSxHQUFYOztBQUVBLE1BQUlDLFFBQVFELElBQUlFLEtBQUosQ0FBVSxHQUFWLENBQVo7QUFDQSxPQUFLQyxFQUFMLEdBQVVGLE1BQU1BLE1BQU1HLE1BQU4sR0FBYSxDQUFuQixDQUFWO0FBQ0QsQzs7a0JBR1lMLFEiLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuXG4gICAgbGV0IHBhcnRzID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgdGhpcy5pZCA9IHBhcnRzW3BhcnRzLmxlbmd0aC0xXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvbjtcbiJdfQ==