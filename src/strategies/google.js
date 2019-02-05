import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { getUserAndAddIfNotExists, getUser } from '../data/models/users'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PRODUCTION } = process.env

passport.use(new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: PRODUCTION
      ? 'http://www.example.com/auth/google/callback'
      : 'http://localhost:3001/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      cb(null, await getUserAndAddIfNotExists(profile))
    } catch (err) {
      cb(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  done(null, await getUser(id))
})

export default passport
