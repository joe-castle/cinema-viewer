"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkCustom = exports.CardCustom = exports.Title = void 0;

var _reactstrap = require("reactstrap");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var Title = _styledComponents.default.div.withConfig({
  displayName: "FIlmGroup__Title",
  componentId: "sc-10nky3w-0"
})(["transition:color ease-in .1s;& h2{display:inline-block;}& span{margin-left:.5em;}&:hover{cursor:pointer;color:", "}"], function (_ref) {
  var primary = _ref.theme.primary;
  return "rgb(".concat(primary, ")");
});

exports.Title = Title;
var CardCustom = (0, _styledComponents.default)(_reactstrap.Card).withConfig({
  displayName: "FIlmGroup__CardCustom",
  componentId: "sc-10nky3w-1"
})(["box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);height:100%;transition:all 0.3s cubic-bezier(.25,.8,.25,1);&:hover{box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);}"]);
exports.CardCustom = CardCustom;
var LinkCustom = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "FIlmGroup__LinkCustom",
  componentId: "sc-10nky3w-2"
})(["color:rgb(33,37,41);&:hover{color:rgb(33,37,41);text-decoration:none;}"]);
exports.LinkCustom = LinkCustom;