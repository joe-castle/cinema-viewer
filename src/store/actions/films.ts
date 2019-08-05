import { ofType, ActionsObservable, Epic } from 'redux-observable'
import { mergeMap, map, throttleTime, delay } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { merge, of } from 'rxjs'
import { Reducer } from 'redux'

import { actionCreatorMapFactory } from '../../common/utils'
import { IReduxActionCreatorMap, IReduxAction } from '../../types/redux'
import { IFilm, IUserData } from '../../types/data'

const UPDATE_FILM: string = 'UPDATE_FILM'
const POST_UPDATE_FILM: string = 'POST_UPDATE_FILM'

export const filmActions: IReduxActionCreatorMap<IUserData> = actionCreatorMapFactory(UPDATE_FILM, POST_UPDATE_FILM)

export const filmReducer: Reducer<IFilm[], IReduxAction<IUserData>> = (state = [], { type, payload }): IFilm[] => {
  if (payload) {
    const { _id, ...body } = payload

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
    }
  }

  return state
}

export const filmEpics: Epic<IReduxAction<IUserData>>[] = [
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
        ajax.post(`/api/films/${_id}`, body, { 'Content-Type': 'application/json' }).pipe(
          delay(300),
          map(() => filmActions.updateFilm({ _id, ...body}))
          // FIX: catchError((err) => doSomeErrorHandlind)
        )
      )
    )
  )
]
