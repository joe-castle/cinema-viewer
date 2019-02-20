import { ofType, ActionsObservable, Epic } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { from } from 'rxjs'
import axios from 'axios'
import { Reducer } from 'redux'

import { Film, ReduxAction, ReduxActionCreatorMap } from '../../common/types'
import { actionCreatorMapFactory } from '../../common/utils';

const UPDATE_FILM: string = 'UPDATE_FILM'
const POST_UPDATE_FILM: string = 'POST_UPDATE_FILM'

export const filmActions: ReduxActionCreatorMap<Film> = actionCreatorMapFactory(UPDATE_FILM, POST_UPDATE_FILM)

export const filmReducer: Reducer<Film[], ReduxAction<Film>> = (state = [], { type, payload: { _id, ...body }}): Film[] => {
  switch (type) {
    case UPDATE_FILM: {
      const index: number = state.findIndex((film) => film._id === _id)

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
    default: {
      return state
    }
  }
}

export const filmEpics: Epic<ReduxAction<Film>>[] = [
  (action$: ActionsObservable<ReduxAction<Film>>) => action$.pipe(
    ofType(POST_UPDATE_FILM),
    mergeMap(({ payload: { _id, ...body } }) =>
      from(axios.post(`/api/films/${_id}`, body)).pipe(
        map(() => filmActions.updateFilm({ _id, ...body }))
      )
    )
  )
]
