import { ObjectID } from 'mongodb'

import { multiQ, singleQ } from '../utils/query'
import { IUserData } from '../../types/data'

const userDataM = multiQ<IUserData>('film_user_data')
const userDataS = singleQ<IUserData>('film_user_data')

/**
 * Gets all userData associated with specific user
 * 
 * @param userId The users id
 */
export function getUserData (userId: string): Promise<IUserData[]> {
  return userDataM((col) => col.find({ userId }))
}

/**
 * Updates userdata for specific film in the db
 * 
 * @param userId The users id
 * @param filmId The corresponding film id
 * @param userData The userdata to update
 */
export function insertUpdateUserData (userId: string, filmId: string, userData: IUserData): Promise<IUserData> {
  return userDataS((col) =>
    col.findOneAndUpdate(
      { userId, filmId: new ObjectID(filmId) },
      { $set: userData, $setOnInsert: { userId, filmId: new ObjectID(filmId) } },
      { upsert: true }))
}
