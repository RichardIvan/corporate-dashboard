/* @flow */
'use strict'

import uuid from 'uuid-v4'
import sample from 'lodash/sample'
import { locations } from '../data'

export function fillIDs (json) {
  return json.map((issue) => ({ ...issue, id: uuid() }))
}

export function fillLocation(json) {
  return json.map((issue) => ({ ...issue, location: sample(locations) }))
}

export function fillOpeningTimestamp(json) {
  const date = new Date()
  const now = new Date()
  const past = new Date(now.setFullYear((date.getFullYear() - 1)))

  const diff = date.getTime() - past.getTime()
  const newDiff = diff * Math.random()
  const newDate = new Date(past.getTime() + newDiff)

  return json.map((issue) => ({ ...issue, opening_timestamp: newDate.getTime() }))
}
export function fillClosingTimestamp(json) {
  return json
}
