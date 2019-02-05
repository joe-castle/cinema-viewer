import { handleActions, createActions } from 'redux-actions'

export const filmActions = createActions('UPDATE_FILM')

export const filmReducer = handleActions(
  {
    [filmActions.updateFilm] (state, { payload }) {
      return state
    }
  },
  []
)

export const filmEpics = []
