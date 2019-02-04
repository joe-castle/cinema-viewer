import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import styled from 'styled-components'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import FilmGroup from './FilmGroup'

const Main = styled.main`
  box-shadow: 2px 2px 5px 2px rgba(0,0,0,.1),
      -2px -2px 5px 2px rgba(0,0,0,.1),
      2px -2px 5px 2px rgba(0,0,0,.1),
      -2px 2px 5px 2px rgba(0,0,0,.1);
`

function App (props) {
  return <>
    <Navigation />
    <Main>
      <FilmGroup />
    </Main>
  </>
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    todoText: PropTypes.string,
    complete: PropTypes.bool,
    id: PropTypes.string
  })).isRequired,
  filter: PropTypes.string.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
}

function visibleTodos (todos, filter) {
  switch (filter) {
    default:
    case 'All':
      return todos

    case 'Active':
      return todos.filter(todo => !todo.complete)

    case 'Completed':
      return todos.filter(todo => todo.complete)
  }
}

function mapStateToProps ({ todos, filter }) {
  return {
    todos: visibleTodos(todos, filter),
    filter
  }
}

export default hot(connect(mapStateToProps, actions)(App))
