import path from 'path'
import express from 'express'
// import session from 'express-session';
// import connectRedis from 'connect-redis';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

// import passport from './strategies/twitter';

// import users from './controllers/users';
// import pics from './controllers/pics';

// import client from './db/client';

import render from './render'
import controllers from './controllers'

export default (db) => {
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
    // .use('/api/users', users)
    .use(controllers(db))
    .get('*', render)

  return app
}
