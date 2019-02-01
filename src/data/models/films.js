import query from '../utils/query'

const films = query('films')

export function getAllFilms () {
  return films((col) => col.find())
}

export function getFilmsWithUserData (userId) {
  return films((col) => col.aggregate([
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
