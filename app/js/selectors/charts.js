/* @flow */
'use strict'

import {
  List,
} from 'immutable'

import {
  createSelector,
} from 'reselect'

import {
  getRange,
} from './'

import {
  getGraphDataByRange,
  getGraphData,
} from './graph-data'

export function getVisibleCharts(state: Object): List {
  const visibleTypes: Map = state.visibleChartTypes
  const listOfTypes: List<string> = visibleTypes
                                      .reduce((acc, type, key) => {
                                        if (type) {
                                          return acc.push(key)
                                        }
                                        return acc
                                      }, List.of())
  return listOfTypes
}

export const getChartData = createSelector(
  [getGraphData, getRange, getVisibleCharts],
  (data, range, typesOfVisibleCharts) => getGraphDataByRange(data, range, typesOfVisibleCharts)
)
