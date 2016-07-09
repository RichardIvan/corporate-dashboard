/* @flow */
'use strict'

import { Map, List } from 'immutable'

import {
  getDatesInRange,
  getTotalsByDatesInRange,
  reverseDateStrings,
} from './paying-customers-helpers'

export function getPayingCustomersInRange(data: Map, range:Map): List {
  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const from = range.get('from')
  const to = range.get('to')


  let dates = getDatesInRange(from, to)
  const totals = getTotalsByDatesInRange(data, dates)
  dates = reverseDateStrings(dates)

  const result = dates.map((date, index) => Map({
    date,
    total: totals.get(index),
  }))

  return result
}
