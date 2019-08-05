import { RouteComponentProps, RouteProps } from 'react-router'

import { IFilm, IUser, IShowtimes, IWatched, IUserData } from './data'
import { IReduxActionCreator } from './redux'

/**
 * App.tsx
 */

export interface IAppProps extends IAppActionProps {
  favourite: IFilm[],
  hidden: IFilm[],
  available: IFilm[],
  watched: IFilm[],
  expired: IFilm[],
  films: IFilm[],
  user: IUser|null
}

export interface IAppActionProps extends RouteComponentProps {
  postUpdateFilm: IReduxActionCreator<IUserData>,
  updateFilm: IReduxActionCreator<IUserData>
}

/**
 * BadgeWrapper.tsx
 */

export interface IBadgeWrapperProps {
  film: IFilm,
  [key: string]: any
}

/**
 * Film.tsx
 */
export interface IFilmRouteProps {
  id?: string
}

export interface IFilmProps extends RouteComponentProps<IFilmRouteProps> {
  film?: IFilm,
  user: IUser | null,
  update: (film: IUserData) => void,
  updateFilm: IReduxActionCreator<IUserData>
}

export interface IFilmState {
  modal: boolean,
  watchedForm: boolean
}

// Defines the object used to specify trailer height/width
export interface IDimensions {
  width: string,
  height: string
}

export interface ITrailerProps {
  width: string,
}

export interface ITrailerModalProps {
  toggle: () => void,
  open: boolean,
  trailer?: string
}

/**
 * FilmGroup.tsx
 */

export interface IFilmGroupProps extends RouteProps {
  user: IUser | null,
  films: IFilm[],
  title: string,
  collapse?: boolean
}

export interface IFilmGroupState {
  collapse?: boolean
}

/**
 * Navigation.tsx
 */

export interface INavigationProps {
  user: IUser | null,
  url: string
}

export interface INavigationState {
  isOpen: boolean
}

/**
 * Showtimes.tsx
 */

export interface IShowTimesProps {
  showtimes: IShowtimes,
  [key: string]: IShowtimes
}

export interface IShowTimesStyledProps {
  expired?: boolean,
  today?: boolean
}

/**
 * Watched.tsx
 */

export interface IWatchedProps {
  watched: IWatched
}

/**
 * WatchedForm.tsx
 */
export interface IWatchedFormProps {
  submitForm: Function
}

export interface IWatchedFormState {
  rating: number,
  date: string,
  time: string,
  notes: string,
  format: string,
  [key: string]: string|number
}

/**
 * Rating.tsx
 */
export interface IRatingProps {
  rating?: number
}

/**
 * Icon.tsx
 */

export interface IIconProps {
  // FIX: This needs to get gone when removing eventListener RxJS thing
  type: string,
  icon: string,
  color: string,
  highlight: boolean,
  loading?: boolean
  title?: string
}

/**
 * Loader.tsx
 */
export interface ILoaderProps {
  size?: number,
  color?: string
}

/**
 * Styled-components theme
 */

export interface ITheme {
  primary: string,
  secondary: string,
  dark: string
}