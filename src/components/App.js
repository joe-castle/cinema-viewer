import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import styled from 'styled-components'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import FilmGroup from './FilmGroup'
import Film from './film'

const Main = styled.main`
  /* box-shadow: 2px 2px 5px 2px rgba(0,0,0,.1),
      -2px -2px 5px 2px rgba(0,0,0,.1),
      2px -2px 5px 2px rgba(0,0,0,.1),
      -2px 2px 5px 2px rgba(0,0,0,.1); */
`

function App ({ favourite, hidden, available, films, location }) {
  // console.log('App films:', films)
  return <>
    <Navigation url={location.pathname} />
    <main>
      <Container>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <>
              <FilmGroup {...props} films={favourite} />
              <FilmGroup {...props} films={available} />
              <FilmGroup {...props} films={hidden} />
            </>}
          />
          <Route
            exact
            path='/films'
            render={(props) => <FilmGroup {...props} films={films} />}
          />
          <Route
            path='/films/:id'
            render={(props) => <Film film={films.find((film) => film._id.toString() === props.match.params.id)} />}
          />
        </Switch>
      </Container>
    </main>
  </>
}

// App.propTypes = {
//   films: PropTypes.arrayOf(PropTypes.shape({
//     todoText: PropTypes.string,
//     complete: PropTypes.bool,
//     id: PropTypes.string
//   })).isRequired
// }

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
    favourite: films.filter((film) => film.userData && film.userData.favourite),
    available: films.filter((film) => film.showtimes !== null),
    hidden: films.filter((film) => film.hidden),
    films: processShowtimes(films)
  }
}

export default hot(withRouter(connect(mapStateToProps, actions)(App)))
