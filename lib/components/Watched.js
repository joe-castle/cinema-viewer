"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../common/utils");

function Watched(_ref) {
  var watched = _ref.watched;
  var dateTime = watched.dateTime,
      rating = watched.rating,
      notes = watched.notes,
      format = watched.format;
  var date = new Date(dateTime);
  return _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement("strong", null, "Watched: "), date.toDateString(), " at ", (0, _utils.formatTime)(date)), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Rating: "), rating, "/100"), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Format: "), format), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Notes: "), notes));
}

var _default = Watched;
exports.default = _default;