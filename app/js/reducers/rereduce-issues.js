/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'

import {
  INIT_LOAD,
  PUSH_DATA,
  DELETED_ISSUE
} from '../actions'

const issues = createReducer((state = Map(), action) => {
  switch (action.type) {
    case INIT_LOAD:
      if (action.payload) {
        return state.merge(fromJS(action.payload.data))
      }
      return state
    case PUSH_DATA: {
  //     console.log(action.payload.data)
      return state.mergeDeep(fromJS(action.payload.data))
    }
    case DELETED_ISSUE: {
      const id = action.payload.id
      console.log(state.has(id))
      return state.delete(id)
    }
    default:
      return state
  }
})

export default issues
