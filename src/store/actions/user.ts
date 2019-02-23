import { Epic } from 'redux-observable';
import { actionCreatorMapFactory } from '../../common/utils';
import { Reducer } from 'redux';
import { IReduxActionCreatorMap, IReduxAction } from '../../types/redux';
import { IUser } from '../../types/data';

const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

export const userActions: IReduxActionCreatorMap<IUser> = actionCreatorMapFactory(ADD_USER, REMOVE_USER)

export const userReducer: Reducer<IUser, IReduxAction<IUser>> = (state = {}, { type, payload }): IUser => {
  switch (type) {
    case ADD_USER: {
      return payload
    }
    case REMOVE_USER: {
      return {
        name: { givenName: '' }
      }
    }
    default: {
      return state
    }
  }
}

export const userEpics: Epic[] = []
