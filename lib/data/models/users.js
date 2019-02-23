"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.getUserAndAddIfNotExists = getUserAndAddIfNotExists;

var _query = require("../utils/query");

var users = (0, _query.singleQ)('users');
/**
 * Gets a single user from the database
 * 
 * @param userId the users id
 */

function getUser(userId) {
  return users(function (col) {
    return col.findOne({
      _id: userId
    });
  });
}
/**
 * Returns a user if it exists in the DB,
 * otherwise, writes it to the DB and returns it
 * 
 * @param profile The passport profile returned from the strategie
 */


function getUserAndAddIfNotExists(profile) {
  var user = {
    _id: profile.id,
    name: profile.name
  };
  return users(function (col) {
    return col.findOneAndReplace(user, user, {
      upsert: true
    });
  });
}