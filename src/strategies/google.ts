import { Passport, Profile } from 'passport'
// @ts-ignore no existing @types file
import { Strategy } from 'passport-google-oauth20'
import OAuth2Strategy from 'passport-oauth2'

import { getUserAndAddIfNotExists, getUser } from '../data/models/users'
import { IUser } from '../types/data'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PRODUCTION } = process.env
const passport = new Passport()

passport.use(new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: PRODUCTION
      ? 'http://www.example.com/auth/google/callback'
      : 'http://localhost:3001/auth/google/callback'
  },
  async function verifyFunction (accessToken: string, refreshToken: string, profile: Profile, cb: OAuth2Strategy.VerifyCallback) {
    try {
      cb(null, await getUserAndAddIfNotExists(profile))
    } catch (err) {
      cb(err)
    }
  }
))

passport.serializeUser((user: IUser, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id: string, done) => {
  done(null, await getUser(id))
})

export default passport
