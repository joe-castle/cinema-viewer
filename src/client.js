import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import './assets/css/main.styl'

import configureStore from './store/configureStore'

import App from './components/App'
import ScrollToTop from './components/utils/ScrollToTop'

import theme from './components/styled/theme'

const store = configureStore(window.__PRELOADED_STATE__)

delete window.__PRELOADED_STATE__

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
