import { RouteComponentProps, RouteProps } from "react-router"

import { IFilm, IUser, IShowtimes, IWatched } from "./data"
import { IReduxActionCreator } from "./redux"

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
  postUpdateFilm: IReduxActionCreator<IFilm>, 
  updateFilm: IReduxActionCreator<IFilm>
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

export interface IFilmProps extends RouteComponentProps {
  film: IFilm | undefined,
  user: IUser | null,
  update: Function,
  updateFilm: IReduxActionCreator<IFilm>
}

export interface IFilmState extends IDimensions {
  modal: boolean,
  watchedForm: boolean
}

// Defines the object used to specify trailer height/width
export interface IDimensions {
  width: string,
  height: string
}

export interface ITrailerModalProps {
  width: string,
}

export interface IIconProps {
  type: string,
  icon: string,
  favourite?: boolean,
  hiddenIcon?: boolean
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
  collapse: boolean | undefined
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
 * Styled-components theme
 */

export interface ITheme {
  primary: string,
  secondary: string,
  dark: string
}
