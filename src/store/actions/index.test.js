import actions from './index'

describe('Todo Actions', () => {
  test('Creates an add todo action', () => {
    expect(actions.addTodo('Wash Dishes')).toEqual({
      type: 'ADD_TODO',
      payload: 'Wash Dishes'
    })
  })

  test('Creates a delete todo action', () => {
    expect(actions.deleteTodo('test_id')).toEqual({
      type: 'DELETE_TODO',
      payload: 'test_id'
    })
  })
  
  test('Creates a complete todo action', () => {
    expect(actions.completeTodo('test_id')).toEqual({
      type: 'COMPLETE_TODO',
      payload: 'test_id'
    })
  })
})

describe('Filter actions', () => {
  test('Creates an action with filter set to "All"', () => {
    expect(actions.setFilter('All')).toEqual({
      type: 'SET_FILTER',
      payload: 'All'
    })
  })
})
