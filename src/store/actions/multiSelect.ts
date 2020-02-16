import { Epic } from 'redux-observable'
import { Reducer } from 'redux'

import { actionCreatorMapFactory } from '../../common/utils'
import { IReduxAction, IMultiSelect } from '../../types/redux'

const TOGGLE_MULTI_SELECT = 'TOGGLE_MULTI_SELECT'
const SET_FAVOURITE_LOADING = 'SET_FAVOURITE_LOADING'
const SET_HIDDEN_LOADING = 'SET_HIDDEN_LOADING'

export const multiSelectActions = actionCreatorMapFactory<boolean>(TOGGLE_MULTI_SELECT, SET_FAVOURITE_LOADING, SET_HIDDEN_LOADING)

export const multiSelectReducer: Reducer<IMultiSelect, IReduxAction<boolean>> = (state = {
  enabled: false,
  favouriteLoading: false,
  hiddenLoading: false
}, { type, payload }) => {
  switch (type) {
    case TOGGLE_MULTI_SELECT: return {
      ...state,
      enabled: !state.enabled
    }
    case SET_FAVOURITE_LOADING: return {
      ...state,
      favouriteLoading: payload
    }
    case SET_HIDDEN_LOADING: return {
      ...state,
      hiddenLoading: payload
    }
    default: return state
  }
}

export const multiSelectEpics: Epic[] = []