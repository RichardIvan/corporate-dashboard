import { combineReducers } from 'redux'

import issues from './issues'
import partials from './partials'
import offset from './offset'

const root = combineReducers({
  issues,
  partials,
  offset,
})

export default root
