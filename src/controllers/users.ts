import passport from '../strategies/google'
import { getUserData } from '../data/models/filmUserData'
import { Router } from 'express'

export default function usersController (router: Router): void {
  router.get('/api/user', (req, res) => {
    res.json(req.user)
  })

  router.get('/api/users/:id', async (req, res) => {
    res.json(await getUserData(req.params.id))
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.send(205)
  })

  router.get('/auth/google', passport.authenticate('google', { scope: 'profile' }))

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }))
}
