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
  return filmsS((col) => col.findOne({ _id: filmId }))
}

export function insertOrUpdateOneFilm (filmId, newFilm) {
  return filmsS((col) => col.findOneAndUpdate({ _id: filmId }, newFilm, { upsert: true }))
}

export function intertOrUpdateMultipleFilms (films) {
  return filmsS((col) => {
    const bulk = col.initializeUnorderedBulkOp()

    films.forEach((film) => {
      bulk.find({ title: film.title }).upsert().update({ $set: film })
    })

    return bulk.execute()
  })
}
