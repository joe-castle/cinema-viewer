"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../common/utils");

function BadgeWrapperComp(_ref) {
  var film = _ref.film,
      props = (0, _objectWithoutProperties2.default)(_ref, ["film"]);
  // @ts-ignore undefined check performed by checkUserData
  var watchedDate = new Date((0, _utils.checkUserData)(film, 'watched') && film.userData.watched.dateTime);
  return _react.default.createElement("div", props, (0, _utils.notCheckUserData)(film, function (ud) {
    return ud.new !== false;
  }) && _react.default.createElement(_reactstrap.Badge, {
    color: "success"
  }, "new"), (0, _utils.checkUserData)(film, 'watched') && _react.default.createElement(_reactstrap.Badge, {
    color: "warning"
  }, "".concat((0, _utils.formatDate)(watchedDate), " ").concat((0, _utils.formatTime)(watchedDate))), film.unlimited && _react.default.createElement(_reactstrap.Badge, {
    check: "unlimited",
    color: "danger"
  }, "unlimited"));
}

var BadgeWrapper = (0, _styledComponents.default)(BadgeWrapperComp).withConfig({
  displayName: "BadgeWrapper",
  componentId: "sc-5jjp6m-0"
})(["margin-top:auto;& .badge:not(:first-child){margin-left:.25em;}"]);
var _default = BadgeWrapper;
exports.default = _default;