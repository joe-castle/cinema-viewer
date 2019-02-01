import { multiQ, singleQ } from '../utils/query'

const userDataM = multiQ('film_user_data')
const userDataS = singleQ('film_user_data')

export function getUserData (userId) {
  return userDataM((col) => col.find({ 'user-id': userId }))
}

export function insertUpdateUserData (filmId, userID) {
  
}
