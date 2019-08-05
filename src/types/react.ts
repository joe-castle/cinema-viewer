import { RouteComponentProps } from 'react-router'

import { IFilm, IUser } from './data'
import { IReduxActionCreator } from './redux'

/**
 * App.tsx
 */

export interface IAppProps extends IAppActionProps {
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



/**
 * Film.tsx
 */
export interface IFilmRouteProps {
  id?: string
}

export interface IFilmProps extends RouteComponentProps<IFilmRouteProps> {
  film?: IFilm,
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

export interface ITrailerProps {
  width: string,
}



export interface IShowTimesStyledProps {
  expired?: boolean,
  today?: boolean
}

export interface ITheme {
  primary: string,
  secondary: string,
  dark: string
}
