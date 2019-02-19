import  React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Request, Response } from 'express'
import { Film } from '../common/types'

import { getAllFilms } from '../data/models/films'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'

import theme from '../components/styled/theme'

export default async function render (req: Request, res: Response) {
  try {
    const store = configureStore({
      films: await getAllFilms(req.user),
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
