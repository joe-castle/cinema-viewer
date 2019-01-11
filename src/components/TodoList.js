import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * TODO: Fix stles, currently, not last-child is not selecting correctly
 * so borders look off.
 */
const List = styled.ul`
  padding: 0;
`

const TodoItem = styled.li`
  cursor: pointer;
  font-size: 18px;
  list-style: none;
  position: relative;
`

const TodoText = styled.span`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 10px;
  width: 90%;

  ${({ complete }) => complete ? `
    background: #eee;
    font-style: italic;
    text-decoration: line-through;
  ` : ''}

  &:hover {
    background: rgba(80%, 80%, 80%, .2);
  }

  &:not(:last-child) {
    border-bottom: 0;
  }
`

const DeleteTodo = styled.span`
  border: 1px solid #ccc;
  color: #ccc;
  display: inline-block;
  font-weight: 700;
  height: 100%;
  position: absolute;
  right: 0;
  text-align: center;
  width: 9%;

  &:hover {
    color: white;
    background: rgba(85.1%, 0%, 0%, 0.6);
  }

  &:not(:last-child) {
    border-bottom: 0;
  }
`

function TodoList ({
  todos,
  completeTodo,
  deleteTodo
}) {
  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id}>
          <TodoText
            complete={todo.complete}
            onClick={() => completeTodo(todo.id)}
          >
            {todo.todoText}
          </TodoText>
          <DeleteTodo onClick={() => deleteTodo(todo.id)}>
            x
          </DeleteTodo>
        </TodoItem>
      ))}
    </List>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    todoText: PropTypes.string,
    complete: PropTypes.bool,
    id: PropTypes.string
  })).isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TodoList
