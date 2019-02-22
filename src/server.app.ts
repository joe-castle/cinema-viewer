import path from 'path'
import express from 'express'
import session from 'express-session'
import connect from 'connect-mongo'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { Db } from 'mongodb'

import passport from './strategies/google'

import render from './render'
import controllers from './controllers'

import './cronjobs'

const app = express()
const MongoStore = connect(session)
const { SESSION_SECRET = 'Secret' } = process.env

export default function serverApp (db: Db) {
  return app
    .use(express.static(path.resolve(__dirname, 'assets')))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(session({
      // @ts-ignore connect-mongo depending on incompatible version of mongodb @types
      store: new MongoStore({ db }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(controllers)
    .get('*', render)
}
