"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filmEpics = exports.filmReducer = exports.filmActions = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var _axios = _interopRequireDefault(require("axios"));

var _utils = require("../../common/utils");

var UPDATE_FILM = 'UPDATE_FILM';
var POST_UPDATE_FILM = 'POST_UPDATE_FILM';
var filmActions = (0, _utils.actionCreatorMapFactory)(UPDATE_FILM, POST_UPDATE_FILM);
exports.filmActions = filmActions;

var filmReducer = function filmReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  if (payload) {
    var _id = payload._id,
        body = (0, _objectWithoutProperties2.default)(payload, ["_id"]);

    switch (type) {
      case UPDATE_FILM:
        {
          var index = state.findIndex(function (film) {
            return film._id === _id;
          });
          return [].concat((0, _toConsumableArray2.default)(state.slice(0, index)), [(0, _objectSpread2.default)({}, state[index], {
            userData: (0, _objectSpread2.default)({}, state[index].userData, body)
          })], (0, _toConsumableArray2.default)(state.slice(index + 1, state.length)));
        }
    }
  }

  return state;
};

exports.filmReducer = filmReducer;
var filmEpics = [function (action$) {
  return action$.pipe((0, _reduxObservable.ofType)(POST_UPDATE_FILM), (0, _operators.mergeMap)(function (_ref2) {
    var _ref2$payload = _ref2.payload,
        _id = _ref2$payload._id,
        body = (0, _objectWithoutProperties2.default)(_ref2$payload, ["_id"]);
    return (0, _rxjs.from)(_axios.default.post("/api/films/".concat(_id), body)).pipe((0, _operators.map)(function () {
      return filmActions.updateFilm((0, _objectSpread2.default)({
        _id: _id
      }, body));
    }));
  }));
}];
exports.filmEpics = filmEpics;