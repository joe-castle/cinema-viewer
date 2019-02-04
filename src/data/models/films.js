import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'

const filmsM = multiQ('films')
const filmsS = singleQ('films')

export function getAllFilms () {
  return filmsM((col) => col.find())
}

export function getFilmsWithUserData (userId) {
  return filmsM((col) => col.aggregate([
    {
      $lookup: {
        from: 'film_user_data',
        localField: '_id',
        foreignField: 'film-id',
        as: 'user-data'
      }
    },
    { $unwind: '$user-data' },
    { $match: { 'user-data.user-id': userId } }
  ]))
}

export function getOneFilm (filmId) {
  return filmsS((col) => col.findOne({ _id: new ObjectID(filmId) }))
}

export function insertOrUpdateMultipleFilms (films) {
  return filmsS((col) => {
    const bulk = col.initializeUnorderedBulkOp()

    films.forEach((film) => {
      bulk.find({ title: film.title }).upsert().update({ $set: film })
    })

    return bulk.execute()
  })
}
