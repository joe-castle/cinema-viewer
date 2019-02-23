"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _reactRouterDom = require("react-router-dom");

var _Navigation = require("./styled/Navigation");

// import GoogleLogin from '../assets/img/btn_google_light_normal_ios.svg'
var Navigation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Navigation, _Component);

  function Navigation(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Navigation);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Navigation).call(this, props));
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass2.default)(Navigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var user = this.props.user;
      return _react.default.createElement(_Navigation.NavBarCustom, {
        dark: true,
        expand: "md"
      }, _react.default.createElement(_reactstrap.NavbarBrand, {
        href: "/"
      }, "Cinema Viewer"), _react.default.createElement(_reactstrap.NavbarToggler, {
        onClick: function onClick() {
          return _this2.setState({
            isOpen: !_this2.state.isOpen
          });
        }
      }), _react.default.createElement(_reactstrap.Collapse, {
        isOpen: this.state.isOpen,
        navbar: true
      }, _react.default.createElement(_reactstrap.Nav, {
        navbar: true
      }, _react.default.createElement(_reactstrap.NavItem, {
        active: this.props.url === '/'
      }, _react.default.createElement(_reactRouterDom.Link, {
        className: "nav-link",
        to: "/"
      }, "Home")), _react.default.createElement(_reactstrap.NavItem, {
        active: this.props.url.startsWith('/films')
      }, _react.default.createElement(_reactRouterDom.Link, {
        className: "nav-link",
        to: "/films"
      }, "Films")), _react.default.createElement(_reactstrap.NavItem, {
        active: this.props.url === '/soon'
      }, _react.default.createElement(_reactRouterDom.Link, {
        className: "nav-link",
        to: "/soon"
      }, "Coming Soon"))), _react.default.createElement(_reactstrap.Nav, {
        className: "ml-auto",
        navbar: true
      }, user && _react.default.createElement("span", {
        className: "nav-item navbar-text mr-4"
      }, "Hello ", user.name.givenName), _react.default.createElement(_reactstrap.NavItem, null, !user && _react.default.createElement("a", {
        className: "btn btn-outline-success",
        href: "/auth/google"
      }, "Login with Google"), user && _react.default.createElement("a", {
        className: "btn btn-outline-light",
        href: "/logout"
      }, "Logout")))));
    }
  }]);
  return Navigation;
}(_react.Component);

exports.default = Navigation;