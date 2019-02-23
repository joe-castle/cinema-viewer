"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CopyrightText = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var CopyrightText = _styledComponents.default.p.withConfig({
  displayName: "Footer__CopyrightText",
  componentId: "sc-1quumsh-0"
})(["font-weight:500;margin:0 3em;"]); // FIX: Footer doesn't go to the bottom of the page, see A Dog's Way Home For an example


exports.CopyrightText = CopyrightText;

var _default = _styledComponents.default.footer.withConfig({
  displayName: "Footer",
  componentId: "sc-1quumsh-1"
})(["background:rgb(", ");bottom:-8em;color:rgb(", ");display:flex;align-items:center;height:6em;position:absolute;width:100%"], function (_ref) {
  var dark = _ref.theme.dark;
  return dark;
}, function (_ref2) {
  var secondary = _ref2.theme.secondary;
  return secondary;
});

exports.default = _default;