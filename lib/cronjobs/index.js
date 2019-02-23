"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _nodeSchedule = require("node-schedule");

var _fetchFilms = _interopRequireDefault(require("./fetchFilms"));

(0, _nodeSchedule.scheduleJob)('0 3 * * *', _fetchFilms.default);