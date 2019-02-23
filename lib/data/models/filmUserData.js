"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = getUserData;
exports.insertUpdateUserData = insertUpdateUserData;

var _mongodb = require("mongodb");

var _query = require("../utils/query");

var userDataM = (0, _query.multiQ)('film_user_data');
var userDataS = (0, _query.singleQ)('film_user_data');
/**
 * Gets all userData associated with specific user
 * 
 * @param userId The users id
 */

function getUserData(userId) {
  return userDataM(function (col) {
    return col.find({
      userId: userId
    });
  });
}
/**
 * Updates userdata for specific film in the db
 * 
 * @param userId The users id
 * @param filmId The corresponding film id
 * @param userData The userdata to update
 */


function insertUpdateUserData(userId, filmId, userData) {
  return userDataS(function (col) {
    return col.findOneAndUpdate({
      userId: userId,
      filmId: new _mongodb.ObjectID(filmId)
    }, {
      $set: userData,
      $setOnInsert: {
        userId: userId,
        filmId: new _mongodb.ObjectID(filmId)
      }
    }, {
      upsert: true
    });
  });
}