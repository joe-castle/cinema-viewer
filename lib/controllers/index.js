"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _films = _interopRequireDefault(require("./films"));

var _users = _interopRequireDefault(require("./users"));

var router = (0, _express.Router)();
(0, _films.default)(router);
(0, _users.default)(router);
var _default = router;
exports.default = _default;