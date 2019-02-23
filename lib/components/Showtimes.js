"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Film = require("./styled/Film");

var _Showtimes = require("./styled/Showtimes");

var _utils = require("../common/utils");

function Showtimes(_ref) {
  var showtimes = _ref.showtimes;
  return _react.default.createElement(_Film.RowCenter, null, Object.keys(showtimes).map(function (format) {
    return _react.default.createElement(_Showtimes.ShowCol, {
      lg: 4,
      md: 12
    }, _react.default.createElement("h3", null, format), Object.keys(showtimes[format]).map(function (date) {
      var today = new Date().toDateString() === date;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Showtimes.ShowDate, {
        today: today
      }, date), showtimes[format][date].map(function (date) {
        // Mark as expired if show has been running for an hour
        var expired = Date.parse(date.time) + 60 * 60 * 1000 < Date.now();
        return _react.default.createElement(_Showtimes.ShowTime, (0, _extends2.default)({
          today: today,
          expired: expired
        }, expired ? {} : {
          href: date.url,
          target: '_blank'
        }), (0, _utils.formatTime)(new Date(date.time)));
      }));
    }));
  }));
}

var _default = Showtimes;
exports.default = _default;