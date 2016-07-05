/* @flow */
'use strict'

// import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { getTotalNumberOfVisibleItems } from '../selectors'

import { createReducer } from 'rereduce'

import filteredSortedReducer from './rereduce-filtered-sorted'

import { Map } from 'immutable'

import { SET_OFFSET, SET_FILTER } from '../actions'

const offset = createReducer({ filteredSortedReducer },
  (state = Map({ value: 0 }), action, { filteredSortedReducer }) => {
  switch (action.type) {
  case SET_OFFSET:
    switch (action.payload.value) {
    case 'previous': {
      const val = state.get('value')
      return val < 1 ? state.set('value', 0) : state.set('value', val - 1)
    }
    case 'next': {
      const current = state.get('value')
      const max = Math.floor(filteredSortedReducer.count() / 10)
      return current < max ? state.set('value', state.get('value') + 1) : state
    }
    default: {
      const newState = action.payload.value
      return newState < 0 ? state.set('value', 0) : state.set('value', newState)
    }
  }
  case SET_FILTER:
    return state.set('value', 0)
  default:
    return state
  }
})

export default offset

// const filtered = createReducer({ issuesReducer, filtersReducer },
//
//   (state = List.of(), action, { issuesReducer, filtersReducer }): List => {
