import { handleActions, createActions } from 'redux-actions'
import { generate } from 'shortid'

export const todoActions = createActions('ADD_TODO', 'COMPLETE_TODO', 'DELETE_TODO')

export const todoReducer = handleActions(
  {
    [todoActions.addTodo]: (state, { payload }) => [
      ...state.slice(),
      {
        id: generate(),
        todoText: payload,
        complete: false
      }
    ],
    [todoActions.completeTodo]: (state, { payload: id }) => {
      const index = state.findIndex(todo => todo.id === id)

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          complete: !state[index].complete
        },
        ...state.slice(index + 1)
      ]
    },
    [todoActions.deleteTodo]: (state, { payload: id }) => state.filter(todo => todo.id !== id)
  },
  []
)

export const todoEpics = []
