import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'

const userDataM = multiQ('film_user_data')
const userDataS = singleQ('film_user_data')

export function getUserData (userId) {
  return userDataM((col) => col.find({ 'user_id': new ObjectID(userId) }))
}

// FIX: Fix return value, for upserted values no body is returned
export function insertUpdateUserData (userData) {
  return userDataS((col) =>
    col.findOneAndUpdate(
      { 'user_id': userData['user_id'], 'film_id': userData['film_id'] },
      { $set: { ...userData, 'film_id': new ObjectID(userData['film_id']) } },
      { upsert: true }))
}
