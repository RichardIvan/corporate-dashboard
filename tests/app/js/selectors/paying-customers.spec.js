/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect, { spyOn } from 'expect'
import moment from 'moment'

import { Map, List } from 'immutable'

import {
  getPayingCustomersInRange,
} from '../../../../app/js/selectors/'

import {
  getDatesInRange,
  getTotalsByDatesInRange,
  reverseDateStrings,
} from '../../../../app/js/selectors/paying-customers-helpers'

import {
  generatePayingCustomerData,
} from '../../../../server/src/helpers/paying-customers'

const data = generatePayingCustomerData()

describe('Paying Customers Selector', () => {
  describe('#getPayingCustomersInRange()', () => {
    let range

    beforeEach(() => {
      range = Map({
        range: 'set',
        from: +moment()
                .startOf('day')
                .subtract(6, 'days')
                .format('x'),
        to: +moment()
              .startOf('day')
              .format('x'),
      })
    })

    // it should have 2 arguments passed in
    it('should have 2 arguments passed in', () => {
      const call = {
        getPayingCustomersInRange,
      }
      const spy = spyOn(call, 'getPayingCustomersInRange')
      call.getPayingCustomersInRange(data, range)
      // spy(data, range)

      expect(spy.calls[0].arguments.length).toBe(2)
    })

    // it should have data passed in
    it('should have data passed in', () => {
      const call = {
        getPayingCustomersInRange,
      }
      const spy = spyOn(call, 'getPayingCustomersInRange')
      call.getPayingCustomersInRange(data, range)

      expect(spy.calls[0].arguments[0]).toBe(data)
    })

    // it should have range passed in
    it('should have range passed in', () => {
      const call = {
        getPayingCustomersInRange,
      }
      const spy = spyOn(call, 'getPayingCustomersInRange')
      call.getPayingCustomersInRange(data, range)

      spy(data, range)

      expect(spy.calls[0].arguments[1]).toBe(range)
    })

    // it should return Map
    it('should return a Map', () => {
      expect(getPayingCustomersInRange(data, range)).toBeA(Map)
    })

    it('should throw when no data is provided', () => {
      expect(getPayingCustomersInRange.bind(null)).toThrow('Missing arguments')
    })

    it('should throw when no range is provided', () => {
      expect(getPayingCustomersInRange.bind(null, 'data')).toThrow('Missing arguments')
    })

    it('should throw if one of the arguments is not a Map', () => {
      expect(
        getPayingCustomersInRange.bind(null, 'data', Map())
      ).toThrow('Wrong type of argument(s)')
      expect(
        getPayingCustomersInRange.bind(null, Map(), 'range')
      ).toThrow('Wrong type of argument(s)')
      expect(
        getPayingCustomersInRange.bind(null, data, range)
      ).toNotThrow('Wrong type of argument(s)')
    })

    // Map should container entry 'dates'
    // with corresponding List of dates
    // these items should ve dates in format 'DD/MM/YY'
    it('should contain entry "dates"', () => {
      expect(getPayingCustomersInRange(data, range).has('dates')).toBe(true)
      expect(
        getPayingCustomersInRange(data, range).get('dates').last()
      ).toBe(moment().startOf('day').format('DD/MM/YY'))
    })

    // Map should contain entry 'totals'
    // with corresponding list of values
    // looked up by corresponding date from array at the
    // same position
    it('should contain "totals"', () => {
      expect(getPayingCustomersInRange(data, range).has('totals')).toBe(true)
      expect(
        getPayingCustomersInRange(data, range).get('totals').count()
      ).toBe(
        getPayingCustomersInRange(data, range).get('dates').count()
      )
    })
  })
})

describe('Paying Customers Selector Helpers', () => {
  describe('#getDatesInRange', () => {
    let range

    beforeEach(() => {
      range = Map({
        range: 'set',
        from: +moment()
                .startOf('day')
                .subtract(6, 'days')
                .format('x'),
        to: +moment()
              .startOf('day')
              .format('x'),
      })
    })

    // it should accept 2 arguments
    it('should accept 2 arguments', () => {
      const call = {
        getDatesInRange,
      }
      const from = range.get('from')
      const to = range.get('to')
      const spy = spyOn(call, 'getDatesInRange')

      call.getDatesInRange(from, to)

      expect(spy.calls[0].arguments.length).toBe(2)
    })

    // it should throw if the passed in arguments are not valid numbers
    it('should should throw if passed in arguments are not convertable to moment', () => {
      // const call = {
      //   getDatesInRange,
      // }
      const from = range.get('from')
      const to = range.get('to')
      // const spy = spyOn(call, 'getDatesInRange')
      // call.getDatesInRange(from, to)

      expect(getDatesInRange.bind(null, from, to)).toNotThrow()
      expect(getDatesInRange.bind(null, 'from', to)).toThrow('invalid dates')
    })

    it('should return number of entries according to the range', () => {
      const from = range.get('from')
      const to = range.get('to')
      // const spy = spyOn(call, 'getDatesInRange')
      // call.getDatesInRange(from, to)

      expect(getDatesInRange(from, to).count()).toBe(7)
      // expect(getDatesInRange(from, to)).toThrow('invalid dates')
    })

    // should return List
    it('should return List', () => {
      const from = range.get('from')
      const to = range.get('to')
      // const spy = spyOn(call, 'getDatesInRange')
      // call.getDatesInRange(from, to)

      expect(getDatesInRange(from, to)).toBeA(List)
      // expect(getDatesInRange(from, to)).toThrow('invalid dates')
    })

    it('should return correct dates', () => {
      const from = range.get('from')
      const to = range.get('to')
      // const spy = spyOn(call, 'getDatesInRange')
      // call.getDatesInRange(from, to)

      expect(getDatesInRange(from, to).last()).toBe(moment().startOf('day').format('YY/MM/DD'))
    })
  })

  describe('#getTotalsByDatesInRange()', () => {
    let range

    beforeEach(() => {
      range = Map({
        range: 'set',
        from: +moment()
                .startOf('day')
                .subtract(6, 'days')
                .format('x'),
        to: +moment()
              .startOf('day')
              .format('x'),
      })
    })
    // should take in List and Data
    it('should take in List and Data', () => {
      const call = {
        getTotalsByDatesInRange,
      }

      const from = range.get('from')
      const to = range.get('to')
      const array = getDatesInRange(from, to)

      const spy = spyOn(call, 'getTotalsByDatesInRange')

      call.getTotalsByDatesInRange(data, array)

      expect(spy.calls[0].arguments.length).toBe(2)
      expect(spy.calls[0].arguments[0]).toBeA(Map)
      expect(spy.calls[0].arguments[1]).toBeA(List)
    })


    // should return a list of values per entry in List
    it('should return a list of values per entry in Incoming List', () => {
      const call = {
        getTotalsByDatesInRange,
      }

      const from = range.get('from')
      const to = range.get('to')
      const array = getDatesInRange(from, to)

      const result = getTotalsByDatesInRange(data, array)

      expect(result.count()).toBe(array.count())
      expect(result.get(1)).toBeA('number')
    })

    // s
  })

  describe('#reverseDateStrings', () => {
    let range

    beforeEach(() => {
      range = Map({
        range: 'set',
        from: +moment()
                .startOf('day')
                .subtract(6, 'days')
                .format('x'),
        to: +moment()
              .startOf('day')
              .format('x'),
      })
    })
    // should take in list and return a list
    it('should take in a list and return a list', () => {
      const call = {
        reverseDateStrings,
      }

      const from = range.get('from')
      const to = range.get('to')
      const array = getDatesInRange(from, to)

      const spy = spyOn(call, 'reverseDateStrings')

      call.reverseDateStrings(array)

      expect(spy.calls[0].arguments.length).toBe(1)
      expect(spy.calls[0].arguments[0]).toBeA(List)
      expect(reverseDateStrings(array)).toBeA(List)
    })

    // should make string 'YY/MM/DD' a 'DD/MM/YY'
    it('should make string "YY/MM/DD" a "DD/MM/YY"', () => {
      const from = range.get('from')
      const to = range.get('to')
      const array = getDatesInRange(from, to)

      expect(array.last())
        .toBe(moment().startOf('day').format('YY/MM/DD'))
      expect(reverseDateStrings(array).last())
        .toBe(moment().startOf('day').format('DD/MM/YY'))
    })
  })
})
