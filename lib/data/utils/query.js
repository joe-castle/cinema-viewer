"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiQ = multiQ;
exports.singleQ = singleQ;

var _client = _interopRequireDefault(require("../client"));

var _mongodb = require("mongodb");

/**
 * Generic function to perform a search that expects multiple responses from mongodb.
 * Will automatically convert to JS array when data is fetched.
 * 
 * @param collection mongodb collection name
 */
function multiQ(collection) {
  return function (fn) {
    return new Promise(function (resolve, reject) {
      if (_client.default._db) {
        fn(_client.default._db.collection(collection)).toArray(function (err, results) {
          if (err) reject(err);else resolve(results);
        });
      } else {
        reject(new _mongodb.MongoError('Database not available...'));
      }
    });
  };
}
/**
 * Generic function to perform a sea.
 * 
 * @param collection mongodb collection name
 */


function singleQ(collection) {
  return function (fn) {
    return new Promise(function (resolve, reject) {
      if (_client.default._db) {
        fn(_client.default._db.collection(collection)).then(function (result) {
          resolve(result.lastErrorObject ? result.value : result);
        });
      } else {
        reject(new _mongodb.MongoError('Database not available...'));
      }
    });
  };
}