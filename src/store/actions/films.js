import { handleActions, createActions } from 'redux-actions'
import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { from } from 'rxjs'
import axios from 'axios'

export const filmActions = createActions('UPDATE_FILM', 'POST_UPDATE_FILM')

export const filmReducer = handleActions(
  {
    [filmActions.updateFilm] (state, { payload: { id, ...body } }) {
      const index = state.findIndex((film) => film._id === id)

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          userData: {
            ...state[index].userData,
            ...body
          }
        },
        ...state.slice(index + 1, state.length)
      ]
    }
  },
  []
)

export const filmEpics = [
  action$ => action$.pipe(
    ofType(filmActions.postUpdateFilm),
    mergeMap(({ payload: { id, ...body } }) =>
      from(axios.post(`/api/films/${id}`, body)).pipe(
        map(() => filmActions.updateFilm({ id, ...body }))
      )
    )
  )
]
