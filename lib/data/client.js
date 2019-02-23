"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

/**
 * Connects to mongo instance and adds db to _db property for later reference
 * 
 * @param url mongo url
 * @param db db name
 */
var connect = function connect(url, db) {
  return _mongodb.MongoClient.connect(url, {
    useNewUrlParser: true
  }).then(function (client) {
    connect._db = client.db(db);
    return connect._db;
  }).catch(function (err) {
    return console.log(err);
  });
}; // @ts-ignore FIX: Thinks _db is any type but seems to understand it in the callback...


connect._db = null;
var _default = connect;
exports.default = _default;