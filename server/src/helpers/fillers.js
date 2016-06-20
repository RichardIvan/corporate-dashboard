/* @flow */
'use strict'

import uuid from 'uuid-v4'
import sample from 'lodash/sample'

import { locations } from '../data'
import { getRandomDate } from '../helpers'

export function fillIDs (json) {
  return json.map((issue) => ({ ...issue, id: uuid() }))
}

export function fillLocation(json) {
  return json.map((issue) => ({ ...issue, location: sample(locations) }))
}

export function fillOpeningTimestamp(json) {
  return json.map((issue) => ({ ...issue, opening_timestamp: getRandomDate().getTime() }))
}
export function fillClosingTimestamp(json) {
  return json.map((issue) => {
    if (issue.open_status) {
      return issue
    }

    return ({ ...issue, closing_timestamp: getRandomDate(issue.opening_timestamp).getTime() })
  })
}
