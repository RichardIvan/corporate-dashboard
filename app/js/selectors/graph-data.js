/* @flow */
'use strict'

/* eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

import { Map, List } from 'immutable'


import {
  getLowestDate,
  getHighestDate,
  getMonthlyTotals,
  getDailyTotals,
  mergeResultsByType,
} from './graph-data-helpers'

import {
  formatDate,
} from '../helpers/moment'

export function getGraphData(...args: Array<any>): Map {
  if (!args.length) {
    throw new Error('missing state argument')
  }
  const [state] = args
  return state.graphData.get('data')
}


export function getGraphDataByRange(data: Map, range: Map, types: List<string>): List {
  if (!Map.isMap(data) || !Map.isMap(range) || !List.isList(types)) {
    throw new Error('incorrect argument(s)')
  }

  let result: Map = new Map()

  const rangeType: string = range.get('range')

  switch (rangeType) {
  case 'all': {
    const fullRange: Map = new Map({
      from: formatDate(getLowestDate(data)),
      to: formatDate(getHighestDate(data)),
    })
    result = getMonthlyTotals(data, fullRange)
    break
  }
  case 'set': {
    result = getDailyTotals(data, range)
    break
  }
  default:
    throw new Error('incorrect range type')
  }

  // takes data and creates a an array of eitreis for the graph
  // according to number of dates, it has a Map entry
  // with date, and the rest of values together
  const mergedResult = mergeResultsByType(result, types)

  return mergedResult
}
