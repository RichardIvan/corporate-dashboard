/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'

import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
import { generateShortVersions } from '../helpers/generators'

import {
  INIT_LOAD,
  PUSH_DATA,
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
  default:
    return state
  }
})

export default issues
