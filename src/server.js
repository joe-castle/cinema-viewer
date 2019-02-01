import mongo from './data/client'

import app from './server.app'

mongo(process.env.MONGO_URL, process.env.MONGO_DB)
  .then(() => {
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log('Express server listening on port:', port)
    })
  })
