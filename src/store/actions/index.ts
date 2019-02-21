import { combineReducers, Reducer } from 'redux'
import { combineEpics, Epic } from 'redux-observable'

import { filmActions, filmReducer, filmEpics } from './films'
import { userActions, userReducer, userEpics } from './user'
import { IReduxAction, IState } from '../../types/redux'

export const actions = {
  ...filmActions,
  ...userActions
}

export const rootReducer: Reducer<IState, IReduxAction> = combineReducers({
  films: filmReducer,
  user: userReducer
})

export const rootEpic: Epic<IReduxAction> = combineEpics(
  ...filmEpics,
  ...userEpics
)
