import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'

const filmsM = multiQ('films')
const filmsS = singleQ('films')

/**
 * Fetches all films from DB.
 * If user is provided, will match associated user data with film.
 *
 * @param {string} [user] - The user object
 */
export function getAllFilms (user) {
  return user
    ? getFilmsWithUserData(user._id)
    : filmsM((col) => col.find().sort({ title: 1 }))
}

export function getFilmsWithUserData (userId) {
  return filmsM((col) => col.aggregate([
    {
      $lookup: {
        from: 'film_user_data',
        localField: '_id',
        foreignField: 'filmId',
        as: 'userData'
      }
    },
    { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } },
    { $match: { $or: [{ 'userData.userId': userId }, { 'userData': { $exists: false } }] } },
    { $sort: { title: 1 } }
  ]))
}

export function getOneFilm (filmId) {
  return filmsS((col) => col.findOne({ _id: new ObjectID(filmId) }))
}

export function insertOrUpdateMultipleFilms (films, updateFn = (film) => ({ $set: film })) {
  return filmsS((col) => {
    const bulk = col.initializeUnorderedBulkOp()

    films.forEach((film) => {
      bulk.find({ title: film.title }).upsert().update(updateFn(film))
    })

    return bulk.execute()
  })
}
