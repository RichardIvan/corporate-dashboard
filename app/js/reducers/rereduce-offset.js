/* @flow */
'use strict'

import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { getTotalNumberOfVisibleItems } from '../selectors'

import { SET_OFFSET } from '../actions'

import { createReducer } from 'rereduce'

const offset = createReducer((state = Map({ value: 0 }), action) => {
  switch (action.type) {
  case SET_OFFSET:
    switch (action.payload.value) {
    case 'previous': {
      return state.get('value') < 1
            ? state.set('value', 0)
            : state.set('value', state.get('value') - 1 )
    }
    case 'next': {
      return state.set('value', state.get('value') + 1)
    }
    default: {
      const newVal = action.payload.value
      return newVal < 0 ? 0 : state.set('value', newVal)
    }
    }
  default:
    return state
  }
})

export default offset
