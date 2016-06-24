/* @flow */
'use strict'

import { createSelector } from 'reselect'
import filter from 'lodash/filter'

import { getFilter, getDataByType } from '../../selectors'

// export const NAME_TYPE = 'name'
// export const EMAIL_TYPE = 'email_address'
// export const OPENING_TIMESTAMP_TYPE = 'opening_timestamp'
// export const CLOSING_TIMESTAMP_TYPE = 'closing_timestamp'
// export const EMPLOYEE_TYPE = 'employee_name'
// export const OPEN_STATUS_TYPE = 'open_status'
// export const LOCATION_TYPE = 'location'

const constructPredicate = function (filterArg) {
  return function(item) {
    return (item[1] >= filterArg.from)
      && ((filterArg.to !== -1)
      ? item[1] <= filterArg.to
      : item[1] >= filterArg.to)
  }
}

// import { OPENING_TIMESTAMP_TYPE } from '../../actions'

export const getSingleDataByFilter = (type: string): Array<any> => createSelector(
  getFilter.bind(null, type),
  getDataByType.bind(null, type),
  (filterArg, data) => {
    const predicate = constructPredicate(filterArg)
    const filtered = filter(data, predicate)
    return filtered
  }
)
