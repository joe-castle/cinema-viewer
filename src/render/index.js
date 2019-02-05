import React from 'react'
import { Provider } from 'react-redux'

import { getAllFilms } from '../data/models/films'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'

export default (req, res) => {
  getAllFilms(req.user)
    .then((results) => {
      const store = configureStore({
        films: results,
        user: req.user
      })

      res.send(
        template(
          <Provider store={store}>
            <App />
          </Provider>,
          store.getState()
        )
      )
    })
}
