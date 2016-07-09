/* @flow */
'use strict'

import { List } from 'immutable'

import {
  getPayingCustomersData,
  getRange,
  getPayingCustomersInRange,
} from '../selectors'

export function getChartData(state: Object): List {
  const data = getPayingCustomersData(state)
  const range = getRange(state)

  if (data) {
    return getPayingCustomersInRange(data, range)
  } else {
    return List.of()
  }
}
