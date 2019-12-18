import { getAllFilms } from '../data/models/films'
import { insertUpdateUserData } from '../data/models/filmUserData'
import { ensureAuthenticated } from '../middleware'
import fetchFilms from '../api/fetchFilms'
import { Router } from 'express'

export default function filmsController (router: Router): void {
  router.get('/api/films', async (req, res) => {
    res.json(await getAllFilms())
  })

  router.get('/api/films/fetchfilms', async (req, res) => {
    res.json(await fetchFilms())
  })

  router.post('/api/films/:id', ensureAuthenticated, async (req, res) => {
    const { id }: { id: string } = req.params
    
    // @ts-ignore cannie be bothered to fix stupid type errors
    res.json(await insertUpdateUserData(req.user._id, id, req.body))
  })
}