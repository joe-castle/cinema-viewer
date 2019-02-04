import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'

const userDataM = multiQ('film_user_data')
const userDataS = singleQ('film_user_data')

export function getUserData (userId) {
  return userDataM((col) => col.find({ 'user-id': new ObjectID(userId) }))
}

export function insertUpdateUserData (userData) {
  return userDataS((col) =>
    col.findOneAndUpdate(
      { 'user-id': userData['user-id'], 'film-id': userData['film-id'] },
      { $set: { ...userData, 'film-id': new ObjectID(userData['film-id']) } },
      { upsert: true }))
}
