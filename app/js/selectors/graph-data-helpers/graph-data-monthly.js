/* @flow */
'use strict'

import { Map, List } from 'immutable'

import {
  getMonthlyDates,
  getTotalsByRange,
} from './general-graph-data-helpers'
import {
  reverseDateStrings,
} from '../../helpers/moment'


export function getMonthlyTotals(data: Map, range: Map): Map {
  const months: List<string> = getMonthlyDates(range)

  const dates: List<string> = reverseDateStrings(months)
  const totals: List<Map<string, number>> = getTotalsByRange(data, range, months)

  return new Map({
    dates,
    totals,
  })
}
