/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  DESCRIPTION_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../../../../app/js/actions/types'

import { setFilter, setSearchFilterValues, resetFilters, clearTimestamp } from '../../../../app/js/actions'

describe('Filter Action Creator', () => {
  describe('#setFilter', () => {
    // should return correct action for name
    it('should return correct action for name', () => {
      expect(setFilter(NAME_TYPE, 'Bro')).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: NAME_TYPE,
          value: 'Bro',
        },
      })
    })

    // should return correct action for email
    it('should return correct action for email', () => {
      expect(setFilter(EMAIL_TYPE, 'Bro@com')).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: EMAIL_TYPE,
          value: 'Bro@com',
        },
      })
    })

    // should return correct action for employee_name
    it('should return correct action for Employee Name', () => {
      expect(setFilter(EMPLOYEE_TYPE, 'Other Bro')).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: EMPLOYEE_TYPE,
          value: 'Other Bro',
        },
      })
    })

    // should return correct action for opeinng_time
    it('should return correct action for Opening Time', () => {
      expect(setFilter(OPENING_TIMESTAMP_TYPE, 1)).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: OPENING_TIMESTAMP_TYPE,
          value: 1,
        },
      })
    })

    // should return correct action for closing_time
    it('should return correct action for Closing Time', () => {
      expect(setFilter(CLOSING_TIMESTAMP_TYPE, 2)).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: CLOSING_TIMESTAMP_TYPE,
          value: 2,
        },
      })
    })

    // should return correct action for open_status
    it('should return correct action for Open Status', () => {
      expect(setFilter(OPEN_STATUS_TYPE, true)).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: OPEN_STATUS_TYPE,
          value: true,
        },
      })
    })

    // should return correct action for location
    it('should return correct action for Location', () => {
      expect(setFilter(LOCATION_TYPE, 'Mars')).toEqual({
        type: 'SET_FILTER',
        payload: {
          type: LOCATION_TYPE,
          value: 'Mars',
        },
      })
    })
  })

  describe('#reset()', () => {
    it('should create correct action', () => {
      expect(resetFilters()).toEqual({
        type: 'RESET_FILTERS',
      })
    })
  })
})
