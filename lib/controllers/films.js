"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filmsController;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _films = require("../data/models/films");

var _filmUserData = require("../data/models/filmUserData");

var _middleware = require("../middleware");

var _fetchFilms = _interopRequireDefault(require("../cronjobs/fetchFilms"));

function filmsController(router) {
  router.get('/api/films',
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
              return (0, _fetchFilms.default)();

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
  router.get('/api/films/fetchfilms',
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = res;
              _context2.next = 3;
              return (0, _films.getAllFilms)();

            case 3:
              _context2.t1 = _context2.sent;

              _context2.t0.json.call(_context2.t0, _context2.t1);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.post('/api/films/:id', _middleware.ensureAuthenticated,
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res) {
      var id;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.t0 = res;
              _context3.next = 4;
              return (0, _filmUserData.insertUpdateUserData)(req.user._id, id, req.body);

            case 4:
              _context3.t1 = _context3.sent;

              _context3.t0.json.call(_context3.t0, _context3.t1);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
}