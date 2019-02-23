import { getAllFilms } from '../data/models/films'
import { insertUpdateUserData } from '../data/models/filmUserData'
import { ensureAuthenticated } from '../middleware'
import fetchFilms from '../cronjobs/fetchFilms'
import { Router, Request, Response } from 'express'

export default function filmsController (router: Router): void {
  router.get('/api/films', async (req: Request, res: Response) => {
    res.json(await fetchFilms())
  })

  router.get('/api/films/fetchfilms', async (req: Request, res: Response) => {
    res.json(await getAllFilms())
  })

  router.post('/api/films/:id', ensureAuthenticated, async (req: Request, res: Response) => {
    const { id }: { id: string } = req.params

    res.json(await insertUpdateUserData(req.user._id, id, req.body))
  })
}
