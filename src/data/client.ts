import { MongoClient, MongoError } from 'mongodb'

import { Connect } from '../types/common'

/**
 * Connects to mongo instance and adds db to _db property for later reference
 * 
 * @param url mongo url
 * @param db db name
 */
const connect: Connect = (url: string, db: string) => {
  return MongoClient.connect(url, { useNewUrlParser: true })
    .then((client: MongoClient) => {
      connect._db = client.db(db)
      return connect._db
    })
    .catch((err: MongoError) => console.log(err))
}

// @ts-ignore FIX: Thinks _db is any type but seems to understand it in the callback...
connect._db = null

export default connect
