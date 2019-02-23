"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var ScrollToTop =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ScrollToTop, _Component);

  function ScrollToTop() {
    (0, _classCallCheck2.default)(this, ScrollToTop);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScrollToTop).apply(this, arguments));
  }

  (0, _createClass2.default)(ScrollToTop, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return ScrollToTop;
}(_react.Component);

var _default = (0, _reactRouterDom.withRouter)(ScrollToTop);

exports.default = _default;