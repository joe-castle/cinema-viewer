"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootEpic = exports.rootReducer = exports.actions = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _redux = require("redux");

var _reduxObservable = require("redux-observable");

var _films = require("./films");

var _user = require("./user");

var actions = (0, _objectSpread2.default)({}, _films.filmActions, _user.userActions);
exports.actions = actions;
var rootReducer = (0, _redux.combineReducers)({
  films: _films.filmReducer,
  user: _user.userReducer
});
exports.rootReducer = rootReducer;

var rootEpic = _reduxObservable.combineEpics.apply(void 0, (0, _toConsumableArray2.default)(_films.filmEpics).concat((0, _toConsumableArray2.default)(_user.userEpics)));

exports.rootEpic = rootEpic;