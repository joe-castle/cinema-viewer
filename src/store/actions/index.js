import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { todoActions, todoReducer, todoEpics } from './todos'
import { filterActions, filterReducer, filterEpics } from './filter'

export const actions = {
  ...todoActions,
  ...filterActions
}

export const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
})

export const rootEpic = combineEpics(
  ...todoEpics,
  ...filterEpics
)
