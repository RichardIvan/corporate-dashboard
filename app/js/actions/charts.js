/* @flow */
'use strict'

import {
  SET_GRAPH_DATA_PENDING_STATE
} from './constants'

export function setChartDataPendingState (status) {
  return {
    type: SET_GRAPH_DATA_PENDING_STATE,
    payload: {
      value: status
    }
  }
}
