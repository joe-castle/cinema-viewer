import { handleActions } from 'redux-actions'
import { generate } from 'shortid'

import actions from '../actions'

export default handleActions(
  {
    [actions.addTodo]: (state, { payload }) => [
      ...state.slice(),
      {
        id: generate(),
        todoText: payload,
        complete: false
      }
    ],
    [actions.completeTodo]: (state, { payload: id }) => {
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
    [actions.deleteTodo]: (state, { payload: id }) => state.filter(todo => todo.id !== id)
  },
  []
)
