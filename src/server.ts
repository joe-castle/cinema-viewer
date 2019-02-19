import { Db } from 'mongodb'
import mongo from './data/client'

import app from './server.app'

const { MONGO_URL = '', MONGO_DB = '', PORT = 3000 } = process.env

mongo(MONGO_URL, MONGO_DB)
  .then((db: Db) => {
    const port: number | string = PORT || 3000

    app(db).listen(port, () => {
      console.log('Express server listening on port:', port)
    })
  })
