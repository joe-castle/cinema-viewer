import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'

const userDataM = multiQ('film_user_data')
const userDataS = singleQ('film_user_data')

export function getUserData (userId) {
  return userDataM((col) => col.find({ userId: new ObjectID(userId) }))
}

// FIX: Fix return value, for upserted values no body is returned
export function insertUpdateUserData (userId, filmId, userData) {
  return userDataS((col) =>
    col.findOneAndUpdate(
      { userId, filmId: new ObjectID(filmId) },
      { $set: userData, $setOnInsert: { userId, filmId: new ObjectID(filmId) } },
      { upsert: true }))
}
