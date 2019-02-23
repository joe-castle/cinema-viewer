"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serverApp;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _google = _interopRequireDefault(require("./strategies/google"));

var _render = _interopRequireDefault(require("./render"));

var _controllers = _interopRequireDefault(require("./controllers"));

require("./cronjobs");

var app = (0, _express.default)();
var MongoStore = (0, _connectMongo.default)(_expressSession.default);
var _process$env$SESSION_ = process.env.SESSION_SECRET,
    SESSION_SECRET = _process$env$SESSION_ === void 0 ? 'Secret' : _process$env$SESSION_;

function serverApp(db) {
  return app.use('/assets', _express.default.static(_path.default.resolve(__dirname, 'assets'))).use(_bodyParser.default.json()).use((0, _cookieParser.default)()).use((0, _expressSession.default)({
    // @ts-ignore connect-mongo depending on incompatible version of mongodb @types
    store: new MongoStore({
      db: db
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })).use(_google.default.initialize()).use(_google.default.session()).use(_controllers.default).get('*', _render.default);
}