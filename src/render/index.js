import React from 'react'
import { Provider } from 'react-redux'

import configureStore from '../store/configureStore'
import template from './template'

import App from '../components/App'

export default (req, res) => {
  // Do async stuff...
  const store = configureStore(/* PROVIDE PRELOADED STATE */)

  res.send(
    template(
      <Provider store={store}>
        <App />
      </Provider>,
      store.getState()
    )
  )
}
