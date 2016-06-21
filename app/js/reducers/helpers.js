'use strict'

import papa from 'papaparse'
import { Map } from 'immutable'
import { drop, take, flatten, zipObject, reduce, map } from 'lodash'

const INVALID_KEYS = ['', 'undefined', 'null']

export function createReducer(initialState, handlers = {}) {
  let count = 0

  for (const key in handlers) {
    if (handlers.hasOwnProperty(key) && INVALID_KEYS.indexOf(key) < 0) {
      count += 1
    } else {
      throw new Error('Unexpected action type found while creating reducer')
    }
  }

  if (!count) throw new Error('No action types found while creating reducer')

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type] || handlers[createReducer.DEFAULT]

    if (handler) {
      return handler(state, action)
    }

    return state
  }
}

export function transformCSVtoJSON (data) {

  if (!data) {
    return Map()
  }

  const json = papa.parse(data).data

  if (json.length < 2) {
    return data
  }

  const header = flatten(take(json))
  const body = drop(json)

  const zippedObject = reduce(body, (accumulator, issue) => {
    const item = { ...accumulator, [issue[0]]: zipObject(header, issue) }
    return item
  }, {})

  return zippedObject
}

export function transformNewIssue (issues) {
  const stuff = reduce(issues, (accumulator, issue) => {
    const item = { ...accumulator, [issue.id]: { ...issue } }
    return item
  }, {})

  return stuff
}

createReducer.DEFAULT = '@@DEFAULT'
