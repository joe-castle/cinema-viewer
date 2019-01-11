import { handleAction } from 'redux-actions'

import actions from '../actions'

export default handleAction(
  actions.setFilter,
  (state, { payload }) => payload,
  'All'
)
