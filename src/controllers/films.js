import { getAllFilms } from '../data/models/films'
import { insertUpdateUserData } from '../data/models/filmUserData'
import { ensureAuthenticated } from '../middleware'
import fetchFilms from '../cronjobs/fetchFilms'

export default function filmsController (router) {
  router.get('/api/films', async (req, res) => {
    res.json(await getAllFilms())

    // res.json(await fetchFilms())
  })

  router.post('/api/films/:id', ensureAuthenticated, async (req, res) => {
    const { id } = req.params

    res.json(await insertUpdateUserData(req.user._id, id, req.body))
  })
}
