import { Action } from 'redux'
import { IUser, IFilm } from './data'

export interface IState {
  films: IFilm[],
  user: IUser,
  [key: string]: any
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
