import passport from '../strategies/google'

export default function usersController (router) {
  router.get('/api/user', (req, res) => {
    res.json(req.user)
  })

  router.get('/auth/google', passport.authenticate('google', { scope: 'profile' }))

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }))
}
