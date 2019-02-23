import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid #ccc;
  font-size: 25px;
  padding: 15px;
  width: 100%;

  &:hover {
    border-color: rgba(0, 0, 0, .7);
  }
`

export default class TodoForm extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { todoText: '' }
  }

  render () {
    return (
      <form
        onSubmit={(ev) => {
          ev.preventDefault()
          if (this.state.todoText !== '') {
            this.props.addTodo(this.state.todoText)
            this.setState({ todoText: '' })
          }
        }}
      >
        <Input
          placeholder='Enter new todo...'
          value={this.state.todoText}
          onChange={(e) => {
            this.setState({ todoText: e.target.value })
          }}
        />
      </form>
    )
  }
}
