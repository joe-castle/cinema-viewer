import { combineReducers, Reducer } from 'redux'
import { combineEpics, Epic } from 'redux-observable'

import { filmActions, filmReducer, filmEpics } from './films'
import { userActions, userReducer, userEpics } from './user'
import { searchActions, searchReducer, searchEpics } from './search'
import { multiSelectActions, multiSelectReducer, multiSelectEpics } from './multiSelect'
import { IReduxAction, IState } from '../../types/redux'

export const actions = {
  ...filmActions,
  ...userActions,
  ...searchActions,
  ...multiSelectActions
}

// @ts-ignore
export const rootReducer: Reducer<IState, IReduxAction> = combineReducers({
  films: filmReducer,
  user: userReducer,
  search: searchReducer,
  multiSelect: multiSelectReducer
})

export const rootEpic: Epic<IReduxAction> = combineEpics(
  ...filmEpics,
  ...userEpics,
  ...searchEpics,
  ...multiSelectEpics
)
