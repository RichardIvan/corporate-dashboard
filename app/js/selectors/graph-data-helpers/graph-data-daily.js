/* @flow */
'use strict'

import { Map, List } from 'immutable'

import {
  getItemsByRange,
  getDatesInRange,
  transformOpenIssuesTotals,
} from '../graph-data-helpers/general-graph-data-helpers'

import {
  reverseDateStrings,
} from '../../helpers/moment'

export function getDailyTotals(data: Map, range: Map): Map {
  let dates: List<string> = getDatesInRange(range)

  let totals: List<Map<string, number>> = getItemsByRange(data, dates)
  totals = transformOpenIssuesTotals(totals)
  dates = reverseDateStrings(dates)

  return new Map({
    dates,
    totals,
  })
}
