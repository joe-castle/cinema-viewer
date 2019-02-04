import { getFilmsWithUserData, getAllFilms } from '../data/models/films'
import { insertUpdateUserData } from '../data/models/filmUserData'
import { ensureAuthenticated } from '../middleware'
import fetchFilms from '../cronjobs/fetchFilms'

export default (router) => {
  router.get('/api/films', (req, res) => {
    if (req.user) {
      getFilmsWithUserData(req.user._id)
        .then((results) => res.send(results))
    } else {
      getAllFilms()
        .then((result) => res.send(result))
    }
    // fetchFilms()
    //   .then((result) => res.send(result))
  })

  router.post('/api/films/:id', ensureAuthenticated, (req, res) => {
    const { id } = req.params

    insertUpdateUserData({ ...req.body, 'user-id': req.user._id, 'film-id': id })
      .then((result) => {
        res.send(result)
      })
  })
}
