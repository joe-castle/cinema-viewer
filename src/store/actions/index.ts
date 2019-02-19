import { combineReducers, Reducer } from 'redux'
import { combineEpics } from 'redux-observable'
import { State } from '../../common/types'

import { filmActions, filmReducer, filmEpics } from './films'
import { userActions, userReducer, userEpics } from './user'
import { CombinedActionType } from 'redux-actions';

export const actions = {
  ...filmActions,
  ...userActions
}

export const rootReducer: Reducer<State> = combineReducers<State>({
  films: filmReducer,
  user: userReducer
})

export const rootEpic = combineEpics(
  ...filmEpics,
  ...userEpics
)
