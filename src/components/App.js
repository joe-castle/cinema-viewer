import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import styled from 'styled-components'

import actions from '../store/actions'

import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import TodoFilters from '../components/TodoFilters'

const TopStyle = styled.div`
  margin: 100px auto;
  max-width: 600px;
`

const Main = styled.main`
  box-shadow: 2px 2px 5px 2px rgba(0,0,0,.1),
      -2px -2px 5px 2px rgba(0,0,0,.1),
      2px -2px 5px 2px rgba(0,0,0,.1),
      -2px 2px 5px 2px rgba(0,0,0,.1);
`

const Container = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 80%;
`

const Heading = styled.h2`
  color: rgba(85.1%, 0%, 0%, 0.859);
  font-size: 75px;
  font-weight: 300;
  margin: 0;
  padding: 15px;
  text-align: center;
`

function App (props) {
  return (
    <TopStyle>
      <Main>
        <Container>
          <Heading>todos</Heading>
          <TodoForm addTodo={props.addTodo} />
          <TodoList
            todos={props.todos}
            completeTodo={props.completeTodo}
            deleteTodo={props.deleteTodo}
          />
          <TodoFilters
            filter={props.filter}
            setFilter={props.setFilter}
          />
        </Container>
      </Main>
    </TopStyle>
  )
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
