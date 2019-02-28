import mongo from './data/client'
import app from './server.app'

const { 
  MONGODB_URI = '', 
  PORT = 3000
} = process.env

mongo(MONGODB_URI)
  .then((db) => {    
    if (db) {
      app(db).listen(PORT, (err: Error) => {
        if (err) {
          console.error(err)
          process.exit(1)
        } else {
          console.log('Express server listening on port:', PORT)
        }
      })
    } else {
      console.error('Something went wrong connecting to the DB')
      process.exit(1)
    }
  })
