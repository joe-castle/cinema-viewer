"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

require("bootstrap/dist/css/bootstrap.min.css");

require("open-iconic/font/css/open-iconic-bootstrap.css");

require("./assets/css/main.styl");

var _configureStore = _interopRequireDefault(require("./store/configureStore"));

var _App = _interopRequireDefault(require("./components/App"));

var _ScrollToTop = _interopRequireDefault(require("./components/utils/ScrollToTop"));

var _theme = _interopRequireDefault(require("./components/styled/theme"));

var store = (0, _configureStore.default)(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

_reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_styledComponents.ThemeProvider, {
  theme: _theme.default
}, _react.default.createElement(_ScrollToTop.default, null, _react.default.createElement(_App.default, null))))), document.getElementById('root'));