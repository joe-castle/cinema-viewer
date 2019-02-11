import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { getAllFilms } from '../data/models/films'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'

import theme from '../components/styled/theme'

export default async function render (req, res) {
  try {
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
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </StaticRouter>
        </Provider>,
        store.getState()
      )
    )
  } catch (err) {
    console.log('Error whilst server rendering:\n', err.stack)
  }
}
