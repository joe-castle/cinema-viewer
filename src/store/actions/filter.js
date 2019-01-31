import { handleAction, createActions } from 'redux-actions'

export const filterActions = createActions('SET_FILTER')

export const filterReducer = handleAction(
  filterActions.setFilter,
  (state, { payload }) => payload,
  'All'
)

export const filterEpics = []
