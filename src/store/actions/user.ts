import { Epic } from 'redux-observable'
import { actionCreatorMapFactory } from '../../common/utils'
import { Reducer } from 'redux'
import { IReduxAction } from '../../types/redux'
import { IUser } from '../../types/data'

const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

export const userActions= actionCreatorMapFactory<IUser>(ADD_USER, REMOVE_USER)

export const userReducer: Reducer<IUser, IReduxAction<IUser>> = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_USER: return payload
    case REMOVE_USER: return { name: { givenName: '' } }
    default: return state
  }
}

export const userEpics: Epic[] = []
