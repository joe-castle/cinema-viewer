import db from '../client'
import { Collection, Cursor, MongoError, FindAndModifyWriteOpResultObject, AggregationCursor } from 'mongodb';

/**
 * Generic function to perform a search that expects multiple responses from mongodb.
 * Will automatically convert to JS array when data is fetched.
 * 
 * @param collection mongodb collection name
 */
export function multiQ <T> (collection: string): (fn: (col: Collection<T>) => Cursor<T>|AggregationCursor<T>) => Promise<T[]> {
  return (fn) => new Promise((resolve, reject) => {
    if (db._db) {
      fn(db._db.collection(collection)).toArray((err: MongoError, results: T[]) => {
        if (err) reject(err)
        else resolve(results)
      })
    } else {
      reject(new MongoError('Database not available...'))
    }
  })
}

/**
 * Generic function to perform a sea.
 * 
 * @param collection mongodb collection name
 */
export function singleQ <T> (collection: string): (fn: (col: Collection<T>) => Promise<FindAndModifyWriteOpResultObject<T>|T|null>) => Promise<T> {
  return (fn) => new Promise((resolve, reject) => {
    if (db._db) {
      fn(db._db.collection(collection))
        .then((result) => {
          resolve((<FindAndModifyWriteOpResultObject<T>> result).lastErrorObject
            ? (<FindAndModifyWriteOpResultObject<T>> result).value
            : <T> result)
        })
    } else {
      reject(new MongoError('Database not available...'))
    }
  })
}
