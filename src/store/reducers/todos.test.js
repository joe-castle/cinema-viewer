import { isValid } from 'shortid'

import todos from './todos'

describe('Todos Reducer', () => {
  test('Returns the initial state', () => {
    expect(Array.isArray(todos(undefined, {}))).toBe(true)
  })

  test('Adds a todo', () => {
    const todo = todos([], { type: 'ADD_TODO', payload: 'Wash Dishes' })[0]

    expect(todo.todoText).toBe('Wash Dishes')
    expect(todo.complete).toBe(false)
    expect(isValid(todo.id)).toBe(true)
  })

  test('Deletes a todo', () => {
    const initialState = [{
      todoText: 'Wash Dishes',
      complete: false,
      id: 'test_id'
    }]
    expect(todos(initialState, { type: 'DELETE_TODO', payload: 'test_id' })).toEqual([])
  })

  test('Completes a todo', () => {
    const initialState = [{
      todoText: 'Wash Dishes',
      complete: false,
      id: 'test_id'
    }]
    expect(todos(initialState, { type: 'COMPLETE_TODO', payload: 'test_id' })).toEqual([{
      todoText: 'Wash Dishes',
      complete: true,
      id: 'test_id'
    }])
  })
})
