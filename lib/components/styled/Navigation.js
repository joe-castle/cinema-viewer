"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavBarCustom = void 0;

var _reactstrap = require("reactstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var NavBarCustom = (0, _styledComponents.default)(_reactstrap.Navbar).withConfig({
  displayName: "Navigation__NavBarCustom",
  componentId: "sc-1k26vrq-0"
})(["background-color:rgb(", ");margin-bottom:1em;"], function (_ref) {
  var primary = _ref.theme.primary;
  return primary;
});
exports.NavBarCustom = NavBarCustom;