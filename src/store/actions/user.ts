import { Epic } from 'redux-observable';
import { actionCreatorMapFactory } from '../../common/utils';
import { Reducer } from 'redux';
import { User, ReduxAction, ReduxActionCreatorMap } from '../../common/types';

const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

export const userActions: ReduxActionCreatorMap<User> = actionCreatorMapFactory(ADD_USER, REMOVE_USER)

export const userReducer: Reducer<User, ReduxAction<User>> = (state = { name: { givenName: '' } }, { type, payload }): User => {
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
