import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

export default (initialState) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(/* MIDDLEWARE GOES HERE */)
  ))

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}
