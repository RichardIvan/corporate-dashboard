'use strict'
import { Map, fromJS } from 'immutable'

export default function issues(state = Map({}), action) {
  switch (action.type) {
  case 'INIT_LAOD':
    if(action.payload) {
      return state.set('issues', fromJS(action.payload))
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)

  default:
    return state
  }
}
