"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = require("passport");

var _passportGoogleOauth = require("passport-google-oauth20");

var _users = require("../data/models/users");

// @ts-ignore no existing @types file
var _process$env = process.env,
    GOOGLE_CLIENT_ID = _process$env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET = _process$env.GOOGLE_CLIENT_SECRET,
    PRODUCTION = _process$env.PRODUCTION;
var passport = new _passport.Passport();
passport.use(new _passportGoogleOauth.Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: PRODUCTION ? 'http://www.example.com/auth/google/callback' : 'http://localhost:3001/auth/google/callback'
},
/*#__PURE__*/
function () {
  var _verifyFunction = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(accessToken, refreshToken, profile, cb) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = cb;
            _context.next = 4;
            return (0, _users.getUserAndAddIfNotExists)(profile);

          case 4:
            _context.t1 = _context.sent;
            (0, _context.t0)(null, _context.t1);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t2 = _context["catch"](0);
            cb(_context.t2);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  function verifyFunction(_x, _x2, _x3, _x4) {
    return _verifyFunction.apply(this, arguments);
  }

  return verifyFunction;
}()));
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(id, done) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = done;
            _context2.next = 3;
            return (0, _users.getUser)(id);

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(null, _context2.t1);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}());
var _default = passport;
exports.default = _default;