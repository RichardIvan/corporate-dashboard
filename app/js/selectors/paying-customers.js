/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  getDatesInRange,
  getTotalsByDatesInRange,
  reverseDateStrings,
} from './paying-customers-helpers'

export function getPayingCustomersInRange(data: Map, range:Map): Map {
  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const from = range.get('from')
  const to = range.get('to')

  const dates = getDatesInRange(from, to)
  const totals = getTotalsByDatesInRange(data, dates)

  const result = Map({
    dates: reverseDateStrings(dates),
    totals,
  })

  return result
}
