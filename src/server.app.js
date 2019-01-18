import path from 'path'
import express from 'express'
// import session from 'express-session';
// import connectRedis from 'connect-redis';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

// import passport from './strategies/twitter';

// import client from './db/client';

import render from './render'
import controllers from './controllers'

const app = express()
// const RedisStore = connectRedis(session);

app
  .use(express.static(path.resolve(__dirname, 'assets')))
// .use(bodyParser.json())
// .use(cookieParser())
// .use(session({
//   store: new RedisStore({ client }),
//   secret: 'NEEDS TO BE CHANGED',
//   resave: false,
//   saveUninitialized: false,
// }))
// .use(passport.initialize())
// .use(passport.session())
  .use(controllers)
  .get('*', render)

export default app
