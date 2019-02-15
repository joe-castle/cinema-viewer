import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import FilmGroup from './FilmGroup'
import Film from './film'
import Footer, { CopyrightText } from './styled/footer'

import { checkUserData, notCheckUserData } from '../utils'

function App ({ favourite, hidden, available, films, location, user, postUpdateFilm, updateFilm }) {
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
            render={(props) => <FilmGroup {...props} user={user} films={films} />}
          />
          <Route
            path='/films/:id'
            render={(props) =>
              <Film
                update={postUpdateFilm}
                updateFilm={updateFilm}
                user={user}
                film={films.find((film) => film._id.toString() === props.match.params.id)}
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

function processShowtimes (films) {
  return films.map((film) => {
    const showtimes = film.showtimes && Object
      .keys(film.showtimes)
      .reduce((prev, format) => ({
        ...prev,
        [format]: film.showtimes[format].reduce((prev, curr) => {
          const date = new Date(curr.time).toDateString()
          return {
            ...prev,
            [date]: [...(prev[date] || []), curr]
          }
        }, {})
      }), {})

    return {
      ...film,
      showtimes
    }
  })
}

function mapStateToProps ({ films, ...props }) {
  return {
    ...props,
    user: props.user && props.user.name ? props.user : null,
    favourite: films.filter((film) => checkUserData(film, 'favourite')),
    available: films.filter((film) => film.showtimes !== null && notCheckUserData(film, '!favourite', '!hidden', '!watched')),
    hidden: films.filter((film) => film.showtimes !== null && checkUserData(film, '!favourite', 'hidden', '!watched')),
    films: processShowtimes(films)
  }
}

export default hot(withRouter(connect(mapStateToProps, actions)(App)))
