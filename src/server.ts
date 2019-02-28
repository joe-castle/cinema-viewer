import { createServer, ServerOptions } from 'spdy'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Express } from 'express'

import mongo from './data/client'
import app from './server.app'

const { 
  MONGODB_URI = '', 
  PORT = 3000,
  CERT_KEY,
  CERT_CERT
} = process.env

mongo(MONGODB_URI)
  .then((db) => {
    const options: ServerOptions = {
      key: readFileSync(resolve(<string> CERT_KEY)),
      cert:  readFileSync(resolve(<string> CERT_CERT))
    }
    
    if (db) {
      const appWithDb: Express = app(db)
      const port: string | number = appWithDb.get('port') || PORT

      createServer(options, appWithDb)
        .listen(port, (err: Error) => {
          if (err) {
            console.error(err)
            process.exit(1)
          } else {
            console.log('Express server listening on port:', port)
          }
        })
    } else {
      console.error('Something went wrong connecting to the DB')
      process.exit(1)
    }
  })
