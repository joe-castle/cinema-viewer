import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import { getAllFilms } from '../data/models/films'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'

export default async function render (req, res) {
  const films = await getAllFilms(req.user)

  const store = configureStore({
    films,
    user: req.user
  })

  const context = {}

  res.send(
    template(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
      store.getState()
    )
  )
}
