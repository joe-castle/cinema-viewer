import { handleActions, createActions } from 'redux-actions'

export const userActions = createActions('ADD_USER', 'REMOVE_USER')

export const userReducer = handleActions(
  {
    [userActions.addUser] (state, { payload }) {
      return {
        name: payload.name
      }
    },
    [userActions.removeUser] () {
      return {
        name: ''
      }
    }
  },
  {}
)

export const userEpics = []
