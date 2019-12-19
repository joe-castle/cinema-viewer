import path from 'path'
import express, { Express } from 'express'
import session from 'express-session'
import connect from 'connect-mongo'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
// @ts-ignore @types don't exist
import gzipStatic from 'connect-gzip-static'

import passport from './strategies/google'

import render from './render'
import controllers from './controllers'

const app = express()
const MongoStore = connect(session)
const { SESSION_SECRET = 'Secret' } = process.env

export default function serverApp (client: MongoClient): Express {
  return app
    .use('/assets', gzipStatic(path.resolve(__dirname, 'assets')))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(session({
      // @ts-ignore connect-mongo depending on incompatible version of mongodb @types
      store: new MongoStore({ client }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(controllers)
    .get('*', render)
}
