import { MongoClient, MongoError, Db } from 'mongodb'

import { Connect } from '../common/types'

/**
 * Connects to mongo instance and adds db to _db property for later reference
 * 
 * @param url mongo url
 * @param db db name
 */
const connect: Connect = function connect (url, db) {
  return MongoClient.connect(url, { useNewUrlParser: true })
    .then((client: MongoClient) => {
      connect._db = client.db(db)
      return connect._db
    })
    .catch((err: MongoError) => console.log(err))
}

connect._db = null

export default connect
