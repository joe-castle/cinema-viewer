import  React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { Request, Response } from 'express'

import { getAllFilms } from '../data/models/films'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'
import theme from '../components/styled/theme'
import { IReduxAction, IState } from '../types/redux'


export default async function render (req: Request, res: Response): Promise<void> {
  try {
    const store: Store<IState, IReduxAction> = configureStore({
      films: await getAllFilms(req.user),
      user: req.user
    })

    const context: StaticRouterContext = {}

    res.send(
      template(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {/* 
            //@ts-ignore erros becuase of ignore comment... */}
            <ThemeProvider theme={theme}>
              {/* 
              //@ts-ignore router props passed in from context with withRouter in App.tsx */}
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
