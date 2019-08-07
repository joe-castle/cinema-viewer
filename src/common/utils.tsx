import React from 'react'

import { IDimensions } from '../types/react'
import { IFilm, IUserData } from '../types/data'
import { IPredicate } from '../types/common'
import { IReduxActionCreator, IReduxAction, IReduxActionCreatorMap } from '../types/redux'
import Loader from '../components/utils/Loader';

/**
 * Calculates screen dimensions for a specific 16:9 aspect ratio
 * 
 * @param w {number} Width parameter to calculate width/height
 * @returns The calculated dimensions object
 */
export function calculateDimensions (w: number): IDimensions {
  const width: number = w >= 992 ? w * 0.7 : w < 576
    ? w - 20 : w * 0.9

  return {
    width: `${width}`,
    height: `${(9 / 16) * width}`
  }
}

/**
 * Pads the beginning of a number with 0 if less then 10
 *
 * @param num {number}
 * @returns The padded string
 */
export function zeroPad (num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

/**
 * Formats a date in the format '10:00'
 * 
 * @param date {Date} The date to be formatted
 * @returns A time string in the above format
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

/**
 * Checks the heavily nested UserData object for the provided conditions
 * 
 * @param film The film in which to check
 * @param conditions the conditions to run against the film
 * @returns true if all conditions pass, false otherwise
 */
export function checkUserData (film: IFilm, ...conditions: (string|IPredicate<IUserData>)[]): boolean {
  const userData: IUserData|undefined = film.userData

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

/**
 * The inverse of checkUserData
 */
export function notCheckUserData (film: IFilm, ...conditions: (string|IPredicate<IUserData>)[]): boolean {
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

export function actionCreatorFactory <T = any> (type: string): IReduxActionCreator<T> {
  return (payload: T): IReduxAction<T> => ({
    type,
    payload
  })
}

export function actionCreatorMapFactory <T = any> (...types: string[]): IReduxActionCreatorMap<T> {
  return types
    .reduce((prev, type) => ({ ...prev, [camelCase(type)]: actionCreatorFactory(type) }), {})
}

/**
 * Fallback element for loadable components
 */
export const fallback = {
  fallback: <Loader />
}
