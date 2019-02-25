import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import FilmGroup from './FilmGroup'
import Film from './Film'
import Footer, { CopyrightText } from './styled/Footer'

import { checkUserData, notCheckUserData } from '../common/utils'
import { IState } from '../types/redux'
import { IAppActionProps, IAppProps } from '../types/react'

function App ({
  favourite,
  hidden,
  available,
  watched,
  expired,
  films,
  location,
  user,
  postUpdateFilm,
  updateFilm }: IAppProps): ReactElement {
  return <>
    <Navigation url={location.pathname} user={user} />
    <main>
      <Container>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <>
              <FilmGroup {...props} user={user} films={favourite} title='Favourites' />
              <FilmGroup {...props} user={user} films={available} title='Available' />
              <FilmGroup {...props} user={user} films={hidden} title='Hidden' collapse />
            </>}
          />
          <Route
            exact
            path='/films'
            render={(props) => <>
              <FilmGroup {...props} user={user} films={watched} title='Watched' />
              <FilmGroup {...props} user={user} films={expired} title='Expired' collapse />
            </>}
          />
          <Route
            path='/films/:id'
            render={(props) =>
              <Film
                {...props}
                update={postUpdateFilm}
                updateFilm={updateFilm}
                user={user}
                film={films.find((film) => (film._id && film._id.toString()) === props.match.params.id)}
              />
            }
          />
        </Switch>
      </Container>
    </main>
    <Footer>
      <CopyrightText>© Joe Smith 2019</CopyrightText>
    </Footer>
  </>
}

function mapStateToProps ({ films, ...props }: IState & IAppActionProps): IAppProps {
  return {
    ...props,
    user: props.user && props.user.name ? props.user : null,
    favourite: films.filter((film) => checkUserData(film, 'favourite')),
    available: films.filter((film) => film.showtimes && notCheckUserData(film, '!favourite', '!hidden', '!watched')),
    hidden: films.filter((film) => film.showtimes && checkUserData(film, '!favourite', 'hidden', '!watched')),
    watched: films.filter((film) => checkUserData(film, 'watched')),
    expired: films.filter((film) => !film.showtimes && checkUserData(film, '!watched')),
    films
  }
}

export default hot(withRouter(connect(mapStateToProps, actions)(App)))
