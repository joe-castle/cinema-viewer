import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

import app from './server.app'

mongoose
  .plugin(autopopulate)
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log('Express server listening on port:', port)
    })
  })
  .catch((err) => {
    console.log(`An error has occured whilst trying to connect to the MongoDB database:\n ${err}`)
  })
