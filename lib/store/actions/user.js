"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userEpics = exports.userReducer = exports.userActions = void 0;

var _utils = require("../../common/utils");

var ADD_USER = 'ADD_USER';
var REMOVE_USER = 'REMOVE_USER';
var userActions = (0, _utils.actionCreatorMapFactory)(ADD_USER, REMOVE_USER);
exports.userActions = userActions;

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case ADD_USER:
      {
        return payload;
      }

    case REMOVE_USER:
      {
        return {
          name: {
            givenName: ''
          }
        };
      }

    default:
      {
        return state;
      }
  }
};

exports.userReducer = userReducer;
var userEpics = [];
exports.userEpics = userEpics;