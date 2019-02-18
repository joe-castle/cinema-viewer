import { MongoClient, Db } from "mongodb"

export interface User {
  _id: string,
  name: {
    givenName: string,
    familyName: string
  }
}

/**
 * Defines the structure of a film object
 */
export interface Film {
  _id: string,
  title: string,
  dateAdded: Date,
  edis: string[],
  poster: string,
  releaseDate: Date,
  showtimes: null|Showtime[]
  synopsis: string,
  trailer: string,
  unlimted: boolean,
  url: string
  userData?: UserData
}

/**
 * Defines the structure of a showtime object
 */
export interface Showtime {
  
}

/**
 * Defines the structure of a userData objcet
 */
export interface UserData {
  _id: string,
  filmId: string,
  userId: string,
  favourite?: boolean,
  hidden?: boolean,
  new?: boolean,
  watched?: Watched,
  [key: string]: string|boolean|Watched
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
 * Connection interface for mongodb client connection
 */
export interface Connect {
  (url: string, db: string): Promise<MongoClient>,
  _db: Db
}

/**
 * Generic type for a function that returns a boolean based on a value
 */
export type Predicate <T> = (value: T) => boolean
