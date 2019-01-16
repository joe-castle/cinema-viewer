import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './assets/css/main.styl'

import configureStore from './store/configureStore'

import App from './components/App'

const store = configureStore(window.__PRELOADED_STATE__)

delete window.__PRELOADED_STATE__

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
