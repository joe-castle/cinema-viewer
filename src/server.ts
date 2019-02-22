import mongo from './data/client'
import app from './server.app'

const { MONGO_URL = '', MONGO_DB = '', PORT = 3000 } = process.env

mongo(MONGO_URL, MONGO_DB)
  .then((db) => {
    const port: number | string = PORT || 3000

    if (db) {
      app(db).listen(port, () => {
        console.log('Express server listening on port:', port)
      })
    } else {
      console.log('Something went wrong connecting to the DB')
    }
  })
