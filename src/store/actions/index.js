import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { filmActions, filmReducer, filmEpics } from './films'
import { userActions, userReducer, userEpics } from './user'

export const actions = {
  ...filmActions,
  ...userActions
}

export const rootReducer = combineReducers({
  films: filmReducer,
  user: userReducer
})

export const rootEpic = combineEpics(
  ...filmEpics,
  ...userEpics
)
