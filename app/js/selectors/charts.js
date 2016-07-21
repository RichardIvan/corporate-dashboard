/* @flow */
'use strict'

import {
  List
} from 'immutable'

import {
  createSelector
} from 'reselect'

import {
  getRange
} from './'

import {
  getGraphDataByRange,
  getGraphData,
  getGraphDataInfo
} from './graph-data'

import {
  getChartDataPendingState
} from '../selectors/graph-data'

export function getVisibleCharts (state: Object): List {
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
  [getGraphData, getRange, getVisibleCharts, getGraphDataInfo],
  (data, range, typesOfVisibleCharts, info) => getGraphDataByRange(data, range, typesOfVisibleCharts, info)
)
