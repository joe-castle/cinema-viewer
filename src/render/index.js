import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '../store/reducers'
import template from './template'

import App from '../components/App'

export default (req, res) => {
  // Do async stuff...
  const store = createStore(rootReducer /* PROVIDE INITIAL STATE */)

  res.send(template(
    <Provider store={store}>
      <App />
    </Provider>,
    store.getState()
  ))
}
