import { ObjectID, UpdateQuery, UnorderedBulkOperation } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'
import { Film } from '../../common/types'

const filmsM = multiQ<Film>('films')
const filmsS = singleQ<Film>('films')

/**
 * Fetches all films from DB.
 * If user is provided, will match associated user data with film.
 *
 * @param {string} [user] - The user object
 */
export function getAllFilms (user: any): Promise<Film[]> {
  return user
    ? getFilmsWithUserData(user._id)
    : filmsM((col) => col.find().sort({ title: 1 }))
}

/**
 * Gets all films and aggergates the result with the user specific data:
 * Rating, review, favourite etc...
 * 
 * @param userId the user id
 */
export function getFilmsWithUserData (userId: string): Promise<Film[]> {
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

/**
 * Gets one film from the DB
 * 
 * @param filmId the film id
 */
export function getOneFilm (filmId: string): Promise<Film> {
  return filmsS((col) => col.findOne({ _id: new ObjectID(filmId) }))
}

/**
 * Inserts multiple films into the DB
 * 
 * @param films an array of films
 * @param updateFn function to send to the update query
 */
export function insertOrUpdateMultipleFilms (films: Film[], updateFn = (film: Film): UpdateQuery<Film> => ({ $set: film })): Promise<Film> {
  return filmsS((col) => {
    const bulk: UnorderedBulkOperation = col.initializeUnorderedBulkOp()

    films.forEach((film) => {
      bulk.find({ title: film.title }).upsert().update(updateFn(film))
    })

    return bulk.execute()
  })
}
