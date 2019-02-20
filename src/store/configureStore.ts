import { createStore, applyMiddleware, Store } from 'redux'
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, rootEpic } from './actions'
import { State, ReduxAction } from '../common/types';

export default function configureStore (initialState: State): Store<State, ReduxAction> {
  const epicMiddleware: EpicMiddleware<ReduxAction> = createEpicMiddleware()

  const store: Store<State, ReduxAction> = createStore(rootReducer, initialState, composeWithDevTools(
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
