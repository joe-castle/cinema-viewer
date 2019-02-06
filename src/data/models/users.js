import { singleQ } from '../utils/query'

const users = singleQ('users')

export function getUser (userId) {
  return users((col) => col.findOne({ _id: userId }))
}

export async function getUserAndAddIfNotExists (profile) {
  const user = { _id: profile.id, name: profile.name }

  return (await users((col) => col.findOneAndReplace(user, user, { upsert: true }))).value
}
