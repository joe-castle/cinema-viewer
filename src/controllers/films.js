import { getAllFilms } from '../data/models/films'
import { insertUpdateUserData } from '../data/models/filmUserData'
import { ensureAuthenticated } from '../middleware'
import fetchFilms from '../cronjobs/fetchFilms'

export default function filmsController (router) {
  router.get('/api/films', async (req, res) => {
    // res.send(await getAllFilms())

    res.send(await fetchFilms())
  })

  router.post('/api/films/:id', ensureAuthenticated, async (req, res) => {
    const { id } = req.params

    res.send(await insertUpdateUserData({ ...req.body, 'user-id': req.user._id, 'film-id': id }))
  })
}
