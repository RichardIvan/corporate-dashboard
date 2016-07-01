/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'

import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
import { generateShortVersions } from '../helpers/generators'

import {
  INIT_LOAD,
  NEW_ISSUE,
} from '../actions'

const issues = createReducer((state = Map(), action) => {
  switch (action.type) {
  case INIT_LOAD:
    if (action.payload) {
      const csv = action.payload.data
      const json = transformCSVtoJSON(csv)

      const complete = generateShortVersions(json)
      // console.log(state)

      return state.merge(fromJS(complete))
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case NEW_ISSUE: {
    const json = transformNewIssue(action.payload.data)

    const complete = generateShortVersions(json)

    return state.mergeDeep(fromJS(complete))
  }
  default:
    return state
  }
})

export default issues
