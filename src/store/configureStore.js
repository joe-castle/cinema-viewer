import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, rootEpic } from './actions'

export default function configureStore (initialState) {
  const epicMiddleware = createEpicMiddleware()

  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(epicMiddleware)
  ))

  epicMiddleware.run(rootEpic)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./actions', () =>
      store.replaceReducer(require('./actions').rootReducer)
    )
  }

  return store
}
