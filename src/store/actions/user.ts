import { Epic, ofType } from 'redux-observable'
import { actionCreatorMapFactory } from '../../common/utils'
import { Reducer } from 'redux'
import { IReduxAction } from '../../types/redux'
import { IUser } from '../../types/data'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const LOGOUT = 'LOGOUT'

export const userActions= actionCreatorMapFactory<IUser>(ADD_USER, REMOVE_USER, LOGOUT)

// @ts-ignore
export const userReducer: Reducer<IUser, IReduxAction<IUser>> = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_USER: return payload
    case REMOVE_USER: return null
    default: return state
  }
}

export const userEpics: Epic<IReduxAction<IUser>>[] = [
  (action$) => action$.pipe(
    ofType(LOGOUT),
    mergeMap(() => ajax.get('/logout')),
    map(() => userActions.removeUser({}))
  )
]
