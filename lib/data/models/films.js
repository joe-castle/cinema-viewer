"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllFilms = getAllFilms;
exports.getFilmsWithUserData = getFilmsWithUserData;
exports.getOneFilm = getOneFilm;
exports.insertOrUpdateMultipleFilms = insertOrUpdateMultipleFilms;

var _mongodb = require("mongodb");

var _query = require("../utils/query");

var filmsM = (0, _query.multiQ)('films');
var filmsS = (0, _query.singleQ)('films');
/**
 * Fetches all films from DB.
 * If user is provided, will match associated user data with film.
 *
 * @param {string} [user] - The user object
 */

function getAllFilms(user) {
  return user ? getFilmsWithUserData(user._id) : filmsM(function (col) {
    return col.find().sort({
      title: 1
    });
  });
}
/**
 * Gets all films and aggergates the result with the user specific data:
 * Rating, review, favourite etc...
 * 
 * @param userId the user id
 */


function getFilmsWithUserData(userId) {
  return filmsM(function (col) {
    return col.aggregate([{
      $lookup: {
        from: 'film_user_data',
        localField: '_id',
        foreignField: 'filmId',
        as: 'userData'
      }
    }, {
      $unwind: {
        path: '$userData',
        preserveNullAndEmptyArrays: true
      }
    }, {
      $match: {
        $or: [{
          'userData.userId': userId
        }, {
          'userData': {
            $exists: false
          }
        }]
      }
    }, {
      $sort: {
        title: 1
      }
    }]);
  });
}
/**
 * Gets one film from the DB
 * 
 * @param filmId the film id
 */


function getOneFilm(filmId) {
  return filmsS(function (col) {
    return col.findOne({
      _id: new _mongodb.ObjectID(filmId)
    });
  });
}
/**
 * Inserts multiple films into the DB
 * 
 * @param films an array of films
 * @param updateFn function to send to the update query
 */


function insertOrUpdateMultipleFilms(films) {
  var updateFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (film) {
    return {
      $set: film
    };
  };
  return filmsS(function (col) {
    var bulk = col.initializeUnorderedBulkOp();
    films.forEach(function (film) {
      bulk.find({
        title: film.title
      }).upsert().update(updateFn(film));
    });
    return bulk.execute();
  });
}