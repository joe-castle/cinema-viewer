import { Film, Dimensions, Predicate, UserData, ReduxAction, ReduxActionCreator, ReduxActionCreatorMap } from "./types"

/**
 * Calculates screen dimensions for a specific 16:9 aspect ratio
 * 
 * @param w {number} Width parameter to calculate width/height
 * @returns {Dimensions} The calculated dimensions object
 */
export function calculateDimensions (w: number): Dimensions {
  const width: number = w >= 992 ? w * 0.7 : w < 576
    ? w - 20 : w * 0.9

  return {
    width,
    height: (9 / 16) * width
  }
}

/**
 * Pads the beginning of a number with 0 if less then 10
 *
 * @param num {number}
 * @returns {string} The padded string
 */
export function zeroPad (num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

/**
 * Formats a date in the format '10:00'
 * 
 * @param date {Date} The date to be formatted
 * @returns {string} A time string in the above format
 */
export function formatTime (date: Date): string {
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`
}

/**
 * Formats a date in the format 'Sat Feb 16'
 * 
 * @param date {Date} The date to be formatted
 */
export function formatDate (date: Date): string {
  return date.toDateString().slice(0, -5)
}

export function checkUserData (film: Film, ...conditions: (string|Predicate<UserData>)[]): boolean {
  const userData: UserData|undefined = film.userData

  if (userData) {
    return conditions.every((condition) => {
      if (typeof condition === 'string') {
        return condition.startsWith('!')
          ? !userData[condition.slice(1)]
          : userData[condition]
      } else if (typeof condition === 'function') {
        return condition(userData)
      }
      
      console.log(`Unexpected condition passed to checkUserData, expected string|Function but got: ${typeof condition}`)
    }) 
  }

  return false
}

export function notCheckUserData (film: Film, ...conditions: (string|Predicate<UserData>)[]): boolean {
  return !film.userData || checkUserData(film, ...conditions)
}

/**
 * Redux helper functions
 */
export function camelCase (value: string): string {
  return value
    .toLowerCase()
    .replace(/_(\w)/gi, (m, g1: string) => g1.toUpperCase())
}

export function actionCreatorFactory <T = any> (type: string): ReduxActionCreator<T> {
  return (payload: T): ReduxAction<T> => ({
    type,
    payload
  })
}

export function actionCreatorMapFactory <T = any> (...types: string[]): ReduxActionCreatorMap<T> {
  return types
    .reduce((prev, type) => ({ ...prev, [camelCase(type)]: actionCreatorFactory(type) }), {})
}