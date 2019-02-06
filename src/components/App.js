import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import FilmGroup from './FilmGroup'

const Main = styled.main`
  /* box-shadow: 2px 2px 5px 2px rgba(0,0,0,.1),
      -2px -2px 5px 2px rgba(0,0,0,.1),
      2px -2px 5px 2px rgba(0,0,0,.1),
      -2px 2px 5px 2px rgba(0,0,0,.1); */
`

function App ({ films, location }) {
  return <>
    <Navigation url={location.pathname} />
    <Main>
      <FilmGroup films={films} />
    </Main>
  </>
}

// App.propTypes = {
//   films: PropTypes.arrayOf(PropTypes.shape({
//     todoText: PropTypes.string,
//     complete: PropTypes.bool,
//     id: PropTypes.string
//   })).isRequired
// }

function mapStateToProps (props) {
  return props
}

export default hot(withRouter(connect(mapStateToProps, actions)(App)))
