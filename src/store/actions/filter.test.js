import filter from './filter'

describe('Filter Reducer', () => {
  test('Returns the initial state', () => {
    expect(filter(undefined, {})).toBe('All')
  })

  test('Set Filter', () => {
    expect(filter('All', { type: 'SET_FILTER', payload: 'Completed' })).toBe('Completed')
  })
})
