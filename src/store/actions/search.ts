import { Epic } from 'redux-observable'
import { actionCreatorMapFactory } from '../../common/utils'
import { Reducer } from 'redux'
import { IReduxAction } from '../../types/redux'

const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE'

export const searchActions= actionCreatorMapFactory<string>(UPDATE_SEARCH_VALUE)

export const searchReducer: Reducer<string, IReduxAction<string>> = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCH_VALUE: return payload
    default: return state
  }
}

export const searchEpics: Epic[] = []
