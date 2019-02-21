import { Action } from "redux";

/** START REDUX TYPE DEFINTIONS */

/**
 * Redux store state
 */
export interface State {
  films: Film[],
  user: User
}

export interface ReduxAction <T = Object> extends Action<string> {
  payload: T
}

export interface ReduxActionCreator <T = Object> {
  (payload: T): ReduxAction<T>
}

export interface ReduxActionCreatorMap <T = Object> {
  [key: string]: ReduxActionCreator<T>
}

/** END REDUX TYPE DEFINTIONS */

/**
 * Defines the structure of a User object
 */
export interface User {
  _id?: string,
  name: {
    givenName: string,
    familyName?: string
  }
}

/**
 * Defines the structure of a film object
 */
export interface Film {
  _id?: string,
  title?: string,
  dateAdded?: Date,
  edis?: string[],
  poster?: string,
  releaseDate?: Date,
  showtimes?: null | {
    [key: string]: Showtime[]
  },
  synopsis?: string,
  trailer?: string,
  unlimited?: boolean,
  url?: string
  userData?: UserData,
  [key: string]: any
}

/**
 * Defines the structure of a showtime object
 */
export interface Showtime {
  time: Date,
  url: string,
  audioType?: string
}

/**
 * Defines the structure of a userData objcet
 */
export interface UserData {
  filmId?: string,
  userId?: string,
  favourite?: boolean,
  hidden?: boolean,
  new?: boolean,
  watched?: Watched,
  [key: string]: any
}

/**
 * Defines the structure of a watched object
 */
export interface Watched {
  rating: number,
  format: string,
  notes: string,
  dateTime: Date
}

/**
 * Defines the object used to specify trailer height/width
 */
export interface Dimensions {
  width: number,
  height: number
}

/**
 * Generic inteface for a function that returns a boolean based on a value
 */
export interface Predicate <T> {
  (value: T): boolean
}
