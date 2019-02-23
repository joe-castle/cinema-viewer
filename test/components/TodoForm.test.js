import React from 'react'
import { shallow, mount } from 'enzyme'

import TodoForm from './TodoForm'

describe('TodoForm', () => {
  const addTodo = jest.fn()

  beforeEach(() => {
    addTodo.mockClear()
  })

  test('Should render', () => {
    const wrapper = mount(<TodoForm addTodo={addTodo} />)

    expect(addTodo).toBeCalledTimes(0)
    expect(wrapper).toMatchSnapshot()
  })

  test('Should call addTodo when form submitted with value in input', () => {
    const wrapper = mount(<TodoForm addTodo={addTodo} />)

    wrapper.setState({ todoText: 'todo' })

    expect(wrapper.find('input').prop('value')).toBe('todo')

    wrapper.find('form').simulate('submit', { preventDefault () {} })

    expect(addTodo).toHaveBeenCalledTimes(1)
    expect(addTodo).toHaveBeenCalledWith('todo')
    expect(wrapper.find('input').prop('value')).toBe('')
  })

  test('Should not call addTodo if form submitted with no value in input', () => {
    const wrapper = shallow(<TodoForm addTodo={addTodo} />)

    wrapper.find('form').simulate('submit', { preventDefault () {} })

    expect(addTodo).toHaveBeenCalledTimes(0)
  })
})
