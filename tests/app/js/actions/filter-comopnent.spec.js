/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { isFSA } from 'flux-standard-action'

import {
  closeFilterComponent,
  selectFilterMenu,
  openFilterComponent,
  filterComponentBack,
  CLOSE_FILTER_COMPONENT,
  SET_FILTER_COMPONENT_MENU_STATE,
  SET_FILTER_COMPONENT_OPEN_STATUS,
  RESET_FILTER_COMPONENT_STATE,
  setSearchFilterValues,
  NAME_TYPE,
  EMAIL_TYPE,
  EMPLOYEE_TYPE,
  LOCATION_TYPE,
} from '../../../../app/js/actions'

describe('Filter Component Action Creator', () => {
  describe('#openFilterComponent()', () => {
    it('should be FSA', () => {
      expect(isFSA(openFilterComponent())).toBe(true)
    })

    it('should create appropriate action', () => {
      expect(openFilterComponent()).toEqual({
        type: SET_FILTER_COMPONENT_OPEN_STATUS,
        payload: true,
      })
    })
  })

  describe('#closeFilterComponent()', () => {
    it('should be FSA', () => {
      expect(isFSA(closeFilterComponent())).toBe(true)
    })

    it('should create appropriate action', () => {
      const expected = {
        type: CLOSE_FILTER_COMPONENT,
      }

      expect(closeFilterComponent()).toEqual(expected)
    })
  })

  describe('#selectFilterMenu()', () => {
    it('should be FSA', () => {
      expect(isFSA(selectFilterMenu())).toBe(true)
    })

    it('should create appropriate action', () => {
      expect(selectFilterMenu('name')).toEqual({
        type: SET_FILTER_COMPONENT_MENU_STATE,
        payload: 'name',
      })
    })
  })

  describe('#filterComponentBack()', () => {
    it('should be FSA', () => {
      expect(isFSA(filterComponentBack())).toBe(true)
    })

    it('should create appropriate action', () => {
      expect(filterComponentBack()).toEqual({
        type: RESET_FILTER_COMPONENT_STATE,
      })
    })
  })

  describe('#setSearchFilterValues()', () => {
    it('should return correct action for name', () => {
      expect(setSearchFilterValues(NAME_TYPE, 'Bro')).toEqual({
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: NAME_TYPE,
          value: 'Bro',
          result: [],
        },
      })
    })

    // should return correct action for email
    it('should return correct action for email', () => {
      expect(setSearchFilterValues(EMAIL_TYPE, 'Bro@com')).toEqual({
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: EMAIL_TYPE,
          value: 'Bro@com',
          result: [],
        },
      })
    })

    // should return correct action for employee_name
    it('should return correct action for Employee Name', () => {
      expect(setSearchFilterValues(EMPLOYEE_TYPE, 'Other Bro')).toEqual({
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: EMPLOYEE_TYPE,
          value: 'Other Bro',
          result: [],
        },
      })
    })

    // should return correct action for location
    it('should return correct action for Location', () => {
      expect(setSearchFilterValues(LOCATION_TYPE, 'Mars')).toEqual({
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: LOCATION_TYPE,
          value: 'Mars',
          result: [],
        },
      })
    })
  })
})
