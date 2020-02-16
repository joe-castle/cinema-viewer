import { createStore, applyMiddleware, Store } from 'redux'
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, rootEpic } from './actions'
import { IState, IReduxAction } from '../types/redux'

export default function configureStore (initialState: IState): Store<IState, IReduxAction> {
  const epicMiddleware: EpicMiddleware<IReduxAction> = createEpicMiddleware()

  const store: Store<IState, IReduxAction> = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(epicMiddleware)
  ))

  epicMiddleware.run(rootEpic)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./actions', () => {
      const reloaded = require('./actions')
      store.replaceReducer(reloaded.rootReducer)
      // @ts-ignore does exits
      epicMiddleware.replaceEpic(reloaded.rootEpic)
    })
  }

  return store
}
