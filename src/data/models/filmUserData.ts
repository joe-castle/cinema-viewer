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
      // @ts-ignore not sure why this is failing now
      { userId, filmId: new ObjectID(filmId) },
      { $set: userData, $setOnInsert: { userId, filmId: new ObjectID(filmId) } },
      { upsert: true }))
}

/**
 * Inserts multiple userData into the DB
 *
 * @param userData an array of userData
 */
export function insertOrUpdateMultipleUserData (userId: string, userData: IUserData[]): Promise<IUserData> {
  return userDataS((col) => {
    const bulk = col.initializeUnorderedBulkOp()

    userData.forEach((userData) => {
      const filmId = userData._id
      delete userData._id

      // @ts-ignore not sure why this is failing now
      bulk.find({ userId, filmId: new ObjectID(filmId) }).upsert().update(
        // @ts-ignore not sure why this is failing now
        { $set: userData, $setOnInsert: { userId, filmId: new ObjectID(filmId) } })
    })

    return bulk.execute()
  })
}