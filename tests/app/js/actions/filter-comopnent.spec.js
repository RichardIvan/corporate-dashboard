/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { isFSA } from 'flux-standard-action'

import {
  closeFilterMenu,
  selectFilterMenu,
  openFilterMenu,
  filterComponentBack,
  CLOSE_FILTER_COMPONENT,
  SET_FILTER_COMPONENT_MENU_STATE,
  SET_FILTER_COMPONENT_OPEN_STATUS,
  RESET_FILTER_COMPONENT_STATE,
} from '../../../../app/js/actions'

describe('Filter Component Action Creator', () => {
  describe('#openFilterMenu()', () => {
    it('should be FSA', () => {
      expect(isFSA(openFilterMenu())).toBe(true)
    })

    it('should create appropriate action', () => {
      expect(openFilterMenu()).toEqual({
        type: SET_FILTER_COMPONENT_OPEN_STATUS,
        payload: true,
      })
    })
  })

  describe('#closeFilterMenu()', () => {
    it('should be FSA', () => {
      expect(isFSA(closeFilterMenu())).toBe(true)
    })

    it('should create appropriate action', () => {
      const expected = {
        type: CLOSE_FILTER_COMPONENT,
      }

      expect(closeFilterMenu()).toEqual(expected)
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
})
