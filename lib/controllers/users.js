"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usersController;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _google = _interopRequireDefault(require("../strategies/google"));

var _filmUserData = require("../data/models/filmUserData");

function usersController(router) {
  router.get('/api/user', function (req, res) {
    res.json(req.user);
  });
  router.get('/api/users/:id',
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res;
              _context.next = 3;
              return (0, _filmUserData.getUserData)(req.params.id);

            case 3:
              _context.t1 = _context.sent;

              _context.t0.json.call(_context.t0, _context.t1);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  router.get('/auth/google', _google.default.authenticate('google', {
    scope: 'profile'
  }));
  router.get('/auth/google/callback', _google.default.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));
}