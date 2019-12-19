import { combineReducers, Reducer } from 'redux'
import { combineEpics, Epic } from 'redux-observable'

import { filmActions, filmReducer, filmEpics } from './films'
import { userActions, userReducer, userEpics } from './user'
import { IReduxAction, IState } from '../../types/redux'
import { searchActions, searchReducer, searchEpics } from './search'

export const actions = {
  ...filmActions,
  ...userActions,
  ...searchActions
}

export const rootReducer: Reducer<IState, IReduxAction> = combineReducers({
  films: filmReducer,
  user: userReducer,
  search: searchReducer
})

export const rootEpic: Epic<IReduxAction> = combineEpics(
  ...filmEpics,
  ...userEpics,
  ...searchEpics
)
