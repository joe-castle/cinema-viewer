"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _films = require("../data/models/films");

var _configureStore = _interopRequireDefault(require("../store/configureStore"));

var _template = _interopRequireDefault(require("./template"));

var _App = _interopRequireDefault(require("../components/App"));

var _theme = _interopRequireDefault(require("../components/styled/theme"));

function render(_x, _x2) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var store, context;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = _configureStore.default;
            _context.next = 4;
            return (0, _films.getAllFilms)(req.user);

          case 4:
            _context.t1 = _context.sent;
            _context.t2 = req.user;
            _context.t3 = {
              films: _context.t1,
              user: _context.t2
            };
            store = (0, _context.t0)(_context.t3);
            context = {};
            res.send((0, _template.default)(_react.default.createElement(_reactRedux.Provider, {
              store: store
            }, _react.default.createElement(_reactRouterDom.StaticRouter, {
              location: req.url,
              context: context
            }, _react.default.createElement(_styledComponents.ThemeProvider, {
              theme: _theme.default
            }, _react.default.createElement(_App.default, null)))), store.getState()));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t4 = _context["catch"](0);
            console.log('Error whilst server rendering:\n', _context.t4.stack);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));
  return _render.apply(this, arguments);
}