'use strict'

import { fromJS, List } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { generateShortVersions } from '../helpers/generators'

import {
  allWithOffset,
} from '../selectors'

// import map from 'lodash/map'

import {
  INIT_LOAD,
  NEW_ISSUE,
  SET_OFFSET,
  SET_SORT,
} from '../actions'


export default function visibleIssues(state = fromJS(new Array(10).fill('')), action) {
  switch (action.type) {
  case INIT_LOAD:
  case NEW_ISSUE:
  case SET_OFFSET:
  case SET_SORT:
    if (action.payload) {
      return allWithOffset(action.payload.state)
    }
    return state
  default:
    return state
  }
}
