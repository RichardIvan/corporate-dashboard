'use strict'

import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { generateShortVersions } from '../helpers/generators'

import { INIT_LOAD, PUSH_DATA, DELETED_ISSUE } from '../actions'

export default function issues (state = new Map(), action) {
  console.log(action.type)
  switch (action.type) {
    case INIT_LOAD:
      if (action.payload) {
        return state.merge(fromJS(action.payload.data))
      }
      return state
      // console.log(state.merge(fromJS(action.payload)))
      // const newState = state.merge({issues: fromJS(action.payload)})
      // console.log(newState)
    case PUSH_DATA: {
      return state.mergeDeep(fromJS(action.payload.data))
    }
    case DELETED_ISSUE: {
      const id = action.payload.id
      console.log(state.has(id))
      return state
    }
    default:
      return state
  }
}
