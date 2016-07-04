/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { List, fromJS } from 'immutable'

// import {
//   NAME_TYPE,
//   EMAIL_TYPE,
//   OPENING_TIMESTAMP_TYPE,
//   CLOSING_TIMESTAMP_TYPE,
//   EMPLOYEE_TYPE,
//   OPEN_STATUS_TYPE,
//   LOCATION_TYPE,
// } from '../../../../app/js/actions'
import {
  OPENING_TIMESTAMP_TYPE,
} from '../../../../app/js/actions'

import { getDataByType } from '../../../../app/js/selectors'

describe('Data By Type Selector', () => {
  it('should return data', () => {
    const state = {
      partials: {
        [OPENING_TIMESTAMP_TYPE]: List.of(List.of(1, 'two'), List.of(1, 'two')),
      },
    }

    expect(getDataByType(OPENING_TIMESTAMP_TYPE, state)).toEqual(fromJS(
      [[1, 'two'], [1, 'two']]
    ))
  })

  it('should trow if no type or state is provided', () => {

  })
})
