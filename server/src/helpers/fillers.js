/* @flow */
'use strict'

import uuid from 'uuid-v4'
import sample from 'lodash/sample'

import { OPENING_TIMESTAMP_TYPE } from '../actions'
import { locations } from '../data'
import { getRandomDate } from '../helpers'

export function fillIDs (json: Array<Object>): Array<Object> {
  return json.map((issue) => ({ ...issue, id: uuid() }))
}

export function fillLocation(json: Array<Object>): Array<Object> {
  return json.map((issue) => ({ ...issue, location: sample(locations) }))
}

export function fillOpeningTimestamp(json: Array<Object>): Array<Object> {
  return json.map((issue) => ({ ...issue, opening_timestamp: getRandomDate().getTime() }))
}

export function fillClosingTimestamp(json: Array<Object>): Array<Object> {
  return json.map((issue) => {
    if (issue.open_status) {
      return issue
    }

    return ({ ...issue, closing_timestamp: getRandomDate(issue[OPENING_TIMESTAMP_TYPE]).getTime() })
  })
}

export function transformNullValues (json: Array<Object>): Array<Object> {
  const transformed = json.map((item) => {
    const keys = Object.keys(item)
    const newObject = keys.reduce((accumulator, key) => {
      if (item[key] === null) {
        accumulator[key] = ''
      } else {
        accumulator[key] = item[key]
      }
      return accumulator
    }, {})

    return newObject
  }, [])

  return transformed
}
