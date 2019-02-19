import passport from '../strategies/google'
import { getUserData } from '../data/models/filmUserData'
import { Router, Response, Request } from 'express';

export default function usersController (router: Router): void {
  router.get('/api/user', (req: Request, res: Response) => {
    res.json(req.user)
  })

  router.get('/api/users/:id', async (req: Request, res: Response) => {
    res.json(await getUserData(req.params.id))
  })

  router.get('/logout', (req: Request, res: Response) => {
    req.logout()
    res.redirect('/')
  })

  router.get('/auth/google', passport.authenticate('google', { scope: 'profile' }))

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }))
}
