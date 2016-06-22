import { combineReducers } from 'redux'
import issues from './issues'
import byOpeningTime from './issues-by-opening-timestamp'

const root = combineReducers({
  issues,
  byOpeningTime,
})

export default root
