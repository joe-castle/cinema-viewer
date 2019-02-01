import query from '../utils/query'

const userData = query('film_user_data')

export function getUserData (userId) {
  return userData((col) => col.find({ 'user-id': userId }))
}
