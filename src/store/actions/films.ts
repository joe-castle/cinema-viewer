import { ofType, Epic, ActionsObservable } from 'redux-observable'
import { mergeMap, map, throttleTime, delay } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { merge, of, from } from 'rxjs'
import { Reducer } from 'redux'

import { actionCreatorMapFactory } from '../../common/utils'
import { IReduxAction } from '../../types/redux'
import { IFilm, IUserData } from '../../types/data'
import { multiSelectActions } from './multiSelect'

const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
const UPDATE_FILM = 'UPDATE_FILM'
const POST_UPDATE_FILM = 'POST_UPDATE_FILM'
const POST_UPDATE_MULTIPLE_FILMS = 'POST_UPDATE_MULTIPLE_FILMS'

export const filmActions = actionCreatorMapFactory<IUserData>(UPDATE_FILM, POST_UPDATE_FILM, 
  TOGGLE_SELECTED, POST_UPDATE_MULTIPLE_FILMS)

export const filmReducer: Reducer<IFilm[], IReduxAction<IUserData>> = (state = [], { type, payload }) => {
  if (payload) {
    const { _id, ...body } = payload
    const index: number = state.findIndex((film) => film._id === _id)

    switch (type) {
      case UPDATE_FILM: {
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
      case TOGGLE_SELECTED: {
        return [
          ...state.slice(0, index),
          {
            ...state[index],
            selected: !state[index].selected
          },
          ...state.slice(index + 1, state.length)
        ]
      }
    }
  }

  return state
}

export const filmEpics: Epic<IReduxAction<any>>[] = [
  (action$: ActionsObservable<IReduxAction<IUserData>>) => action$.pipe(
    ofType(POST_UPDATE_FILM),
    throttleTime(500),
    mergeMap(({ payload: { _id, ...body } }) =>
      merge(
        of(filmActions.updateFilm(
          Object
            .keys(body)
            .reduce((prev, curr) => ({ ...prev, [curr]: 'loading'}), { _id }))
        ),
        ajax.put(`/api/films/${_id}`, body, { 'Content-Type': 'application/json' }).pipe(
          delay(300),
          map(() => filmActions.updateFilm({ _id, ...body}))
          // FIX: catchError((err) => doSomeErrorHandlind)
        )
      )
    )
  ),
  (action$: ActionsObservable<IReduxAction<IUserData[]>>) => action$.pipe(
    ofType(POST_UPDATE_MULTIPLE_FILMS),
    mergeMap(({ payload: films }) => 
      ajax.put(`/api/films`, films, { 'Content-Type': 'application/json' }).pipe(
        mergeMap(() => 
          merge(
            from(films).pipe(
              map((film) => filmActions.updateFilm(film))
            ),
            of(multiSelectActions.setFavouriteLoading(false)),
            of(multiSelectActions.setHiddenLoading(false))
          )
        )
      )
    )
  )
]
