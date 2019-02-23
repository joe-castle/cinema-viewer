"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _client = _interopRequireDefault(require("./data/client"));

var _server = _interopRequireDefault(require("./server.app"));

var _process$env = process.env,
    _process$env$MONGO_UR = _process$env.MONGO_URL,
    MONGO_URL = _process$env$MONGO_UR === void 0 ? '' : _process$env$MONGO_UR,
    _process$env$MONGO_DB = _process$env.MONGO_DB,
    MONGO_DB = _process$env$MONGO_DB === void 0 ? '' : _process$env$MONGO_DB,
    _process$env$PORT = _process$env.PORT,
    PORT = _process$env$PORT === void 0 ? 3000 : _process$env$PORT;
(0, _client.default)(MONGO_URL, MONGO_DB).then(function (db) {
  var port = PORT || 3000;

  if (db) {
    (0, _server.default)(db).listen(port, function () {
      console.log('Express server listening on port:', port);
    });
  } else {
    console.log('Something went wrong connecting to the DB');
  }
});