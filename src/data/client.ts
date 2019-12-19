import { MongoClient, MongoError } from 'mongodb'

import { Connect } from '../types/common'

/**
 * Connects to mongo instance and adds db to _db property for later reference
 *
 * @param url mongo url
 * @param db db name
 */
const connect: Connect = (uri, db) => {
  return MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client: MongoClient): MongoClient => {
      connect._db = client.db(db)
      return client
    })
    .catch((err: MongoError) => console.error(err))
}

connect._db = null

export default connect
