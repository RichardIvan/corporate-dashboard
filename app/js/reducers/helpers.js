'use strict'

import papa from 'papaparse'
import { Map, List, fromJS } from 'immutable'
import { drop, take, flatten, zipObject, reduce, map, sortBy } from 'lodash'

import { OPENING_TIMESTAMP_TYPE, CLOSING_TIMESTAMP_TYPE } from '../actions'

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

export function transformTimestamp(object) {
  return reduce(object, (acc, issue, key) => {
    return {
      ...acc,
      [key]: {
        ...issue,
        [OPENING_TIMESTAMP_TYPE]: parseInt(issue[OPENING_TIMESTAMP_TYPE], 10),
        [CLOSING_TIMESTAMP_TYPE]: issue[CLOSING_TIMESTAMP_TYPE]
                                  ? parseInt(issue[CLOSING_TIMESTAMP_TYPE], 10)
                                  : issue[CLOSING_TIMESTAMP_TYPE],
      },
    }
  }, {})
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
    const indexOfIDKey = header.indexOf('id')
    const item = { ...accumulator, [issue[indexOfIDKey]]: zipObject(header, issue) }
    return item
  }, {})

  const final = transformTimestamp(zippedObject)

  return final
}

export function transformNewIssue (issues) {
  const stuff = reduce(issues, (accumulator, issue) => {
    const item = { ...accumulator, [issue.id]: { ...issue } }
    return item
  }, {})

  return stuff
}

// TODO test
export function fillStateOnInitialLoad(data, type) {

  const json = transformCSVtoJSON(data)

  const results = map(json,
    (item) => List.of(
      item.id,
      isNaN(parseInt(item[type], 10))
        ? item[type]
        : parseInt(item[type], 10)
    )
  )
  // const resultsLen = results.length
  //
  // if (resultsLen > 10) {
  //   const finalResult = fromJS(sortBy(results, (pair) => pair.get(1), 'asc'))
  //   return finalResult
  // }
  //
  // const numberOfItemsToFill = 10 - resultsLen
  // const missingItems = new Array(numberOfItemsToFill).fill(List.of())

  const sortedFinalResult = fromJS(
    sortBy(results, (pair) => pair.get(1), 'asc')
  )

  console.log(sortedFinalResult.toJS())

  return sortedFinalResult
}

export function fillStateOnNewIssue(state, data, type) {
  const json = fromJS(transformNewIssue(data))

  const newState = json.reduce((accumulator, item) => {
    const newItem = fromJS([item.get('id'), item.get(type)])
    return accumulator.push(newItem)
  }, state)

  // const sorted = sortBy(newState.toJS(), (item) => item[1], ['asc']).length
  let sortedNewState = fromJS(
    sortBy(newState.toArray(), (item) => item.get(1), ['asc'])
  )

  // while (sortedNewState.count() > 10 && sortedNewState.last().isEmpty()) {
  //   sortedNewState = sortedNewState.butLast()
  // }

  return sortedNewState
}

export function createPartialReducer(type) {
  const initialState = new Array(10).fill(List.of())

  return function(state = fromJS(initialState), action) {
    switch (action.type) {
    case 'INIT_LOAD':
      if (action.payload) {
        return fillStateOnInitialLoad(action.payload.data, type)
      }
      return state
      // console.log(state.merge(fromJS(action.payload)))
      // const newState = state.merge({issues: fromJS(action.payload)})
      // console.log(newState)
    case 'NEW_ISSUE': {
      return fillStateOnNewIssue(state, action.payload.data, type)
    }
    default:
      return state
    }
  }
}

createReducer.DEFAULT = '@@DEFAULT'
