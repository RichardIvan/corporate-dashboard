/* @flow */
'use strict'

import { createSelector } from 'reselect'
import filter from 'lodash/filter'
import some from 'lodash/some'

import { getFilter, getDataByType, getState } from '../../selectors'

// export const NAME_TYPE = 'name'
// export const EMAIL_TYPE = 'email_address'
// export const OPENING_TIMESTAMP_TYPE = 'opening_timestamp'
// export const CLOSING_TIMESTAMP_TYPE = 'closing_timestamp'
// export const EMPLOYEE_TYPE = 'employee_name'
// export const OPEN_STATUS_TYPE = 'open_status'
// export const LOCATION_TYPE = 'location'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../../actions/types'


// FIX this has changed ther is no more from and to, there is only a timestamp
// TODO this is going to be predicate constructor based on types
// TODO test this
const constructPredicate = function (filterArg, state) {
  switch (filterArg.type) {
  case NAME_TYPE:
  case EMAIL_TYPE:
  case LOCATION_TYPE:
  case EMPLOYEE_TYPE: {
    return function(item) {
      return some(filterArg.by, (filterByItem) => {
        return item[1].toLocaleLowerCase().startsWith(filterByItem.toLocaleLowerCase())
      })
    }
  }
  case OPEN_STATUS_TYPE:
    return function(item) {
      return item[1] === `${filterArg.by}`
    }
  default:
    return function(item) {
      if (filterArg.type === OPENING_TIMESTAMP_TYPE) {
        const toTimestamp = getFilter(CLOSING_TIMESTAMP_TYPE, state).timestamp
        return toTimestamp ?
                item[1] >= filterArg.timestamp && item[1] <= toTimestamp :
                item[1] >= filterArg.timestamp
      } else {
        const fromTimestamp = getFilter(OPENING_TIMESTAMP_TYPE, state).timestamp
        return fromTimestamp ?
                item[1] <= filterArg.timestamp && item[1] >= fromTimestamp :
                item[1] <= filterArg.timestamp
      }
    }
  }

}

// import { OPENING_TIMESTAMP_TYPE } from '../../actions'
// this could be premade..
export const getSingleDataByFilter = (type: string): Array<any> => createSelector(
  getFilter.bind(null, type),
  getDataByType.bind(null, type),
  getState,
  (filterArg, data, state) => {
    const predicate = constructPredicate(filterArg, state)
    const filtered = filter(data, predicate)
    console.log('SINGLE RUN')
    return filtered
  }
)
