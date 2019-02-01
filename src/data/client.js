import { MongoClient } from 'mongodb'

function connect (url, db) {
  return MongoClient.connect(url, { useNewUrlParser: true })
    .then((client) => {
      connect._db = client.db(db)
      return connect._db
    })
    .catch((err) => console.log(err))
}

connect._db = null

export default connect
