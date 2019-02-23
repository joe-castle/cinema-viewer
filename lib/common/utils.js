"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDimensions = calculateDimensions;
exports.zeroPad = zeroPad;
exports.formatTime = formatTime;
exports.formatDate = formatDate;
exports.checkUserData = checkUserData;
exports.notCheckUserData = notCheckUserData;
exports.camelCase = camelCase;
exports.actionCreatorFactory = actionCreatorFactory;
exports.actionCreatorMapFactory = actionCreatorMapFactory;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * Calculates screen dimensions for a specific 16:9 aspect ratio
 * 
 * @param w {number} Width parameter to calculate width/height
 * @returns The calculated dimensions object
 */
function calculateDimensions(w) {
  var width = w >= 992 ? w * 0.7 : w < 576 ? w - 20 : w * 0.9;
  return {
    width: "".concat(width),
    height: "".concat(9 / 16 * width)
  };
}
/**
 * Pads the beginning of a number with 0 if less then 10
 *
 * @param num {number}
 * @returns The padded string
 */


function zeroPad(num) {
  return num < 10 ? "0".concat(num) : "".concat(num);
}
/**
 * Formats a date in the format '10:00'
 * 
 * @param date {Date} The date to be formatted
 * @returns A time string in the above format
 */


function formatTime(date) {
  return "".concat(zeroPad(date.getHours()), ":").concat(zeroPad(date.getMinutes()));
}
/**
 * Formats a date in the format 'Sat Feb 16'
 * 
 * @param date {Date} The date to be formatted
 */


function formatDate(date) {
  return date.toDateString().slice(0, -5);
}

function checkUserData(film) {
  var userData = film.userData;

  if (userData) {
    for (var _len = arguments.length, conditions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      conditions[_key - 1] = arguments[_key];
    }

    return conditions.every(function (condition) {
      if (typeof condition === 'string') {
        return condition.startsWith('!') ? !userData[condition.slice(1)] : userData[condition];
      } else if (typeof condition === 'function') {
        return condition(userData);
      }

      console.log("Unexpected condition passed to checkUserData, expected string|Function but got: ".concat((0, _typeof2.default)(condition)));
    });
  }

  return false;
}

function notCheckUserData(film) {
  for (var _len2 = arguments.length, conditions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    conditions[_key2 - 1] = arguments[_key2];
  }

  return !film.userData || checkUserData.apply(void 0, [film].concat(conditions));
}
/**
 * Redux helper functions
 */


function camelCase(value) {
  return value.toLowerCase().replace(/_(\w)/gi, function (m, g1) {
    return g1.toUpperCase();
  });
}

function actionCreatorFactory(type) {
  return function (payload) {
    return {
      type: type,
      payload: payload
    };
  };
}

function actionCreatorMapFactory() {
  for (var _len3 = arguments.length, types = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    types[_key3] = arguments[_key3];
  }

  return types.reduce(function (prev, type) {
    return (0, _objectSpread3.default)({}, prev, (0, _defineProperty2.default)({}, camelCase(type), actionCreatorFactory(type)));
  }, {});
}