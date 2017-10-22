'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  function Account(client) {
    _classCallCheck(this, Account);

    this._client = client;
  }

  _createClass(Account, [{
    key: 'balance',
    value: function balance(callback) {
      return this._client.get('/accounts/self/ppcards/balance', callback);
    }
  }]);

  return Account;
}();

exports.default = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkFjY291bnQiLCJjbGllbnQiLCJfY2xpZW50IiwiY2FsbGJhY2siLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsTztBQUVKLG1CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUNEOzs7OzRCQUVPRSxRLEVBQVU7QUFDaEIsYUFBTyxLQUFLRCxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsZ0NBQWpCLEVBQW1ERCxRQUFuRCxDQUFQO0FBQ0Q7Ozs7OztrQkFHWUgsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWNjb3VudCB7XG5cbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB9XG5cbiAgYmFsYW5jZShjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZ2V0KCcvYWNjb3VudHMvc2VsZi9wcGNhcmRzL2JhbGFuY2UnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcbiJdfQ==