import { Action } from 'redux'
import { IUser, IFilm } from './data'

export interface IState {
  films: IFilm[],
  user: IUser,
  search?: string,
  multiSelect?: IMultiSelect
  [key: string]: any
}

export interface IMultiSelect {
  enabled?: boolean,
  favouriteLoading?: boolean,
  hiddenLoading?: boolean
}

export interface IReduxAction <T = Object> extends Action<string> {
  payload: T
}

export interface IReduxActionCreator <T = Object> {
  (payload: T): IReduxAction<T>
}

export interface IReduxActionCreatorMap <T = Object> {
  [key: string]: IReduxActionCreator<T>
}
