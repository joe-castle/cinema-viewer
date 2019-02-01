import mongo from './data/client'

import app from './server.app'

mongo(process.env.MONGO_URL, process.env.MONGO_DB)
  .then((db) => {
    const port = process.env.PORT || 3000

    app(db).listen(port, () => {
      console.log('Express server listening on port:', port)
    })
  })
