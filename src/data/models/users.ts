import { singleQ } from '../utils/query'
import { User } from '../../common/types'
import { Profile } from 'passport'
import { FindAndModifyWriteOpResultObject } from 'mongodb';

const users = singleQ<User>('users')

/**
 * Gets a single user from the database
 * 
 * @param userId the users id
 */
export function getUser (userId: string): Promise<User> {
  return users((col) => col.findOne({ _id: userId }))
}

/**
 * Returns a user if it exists in the DB,
 * otherwise, writes it to the DB and returns it
 * 
 * @param profile The passport profile returned from the strategie
 */
export function getUserAndAddIfNotExists (profile: Profile): Promise<User> {
  const user = { _id: profile.id, name: profile.name }

  return users((col) => col.findOneAndReplace(user, user, { upsert: true }))
}
