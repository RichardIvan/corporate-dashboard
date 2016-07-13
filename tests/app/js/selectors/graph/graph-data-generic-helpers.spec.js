/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import moment from 'moment'
import {
  Map,
  List,
} from 'immutable'

import random from 'lodash/random'

import {
  getDatesInRange,
  getItemsByRange,
  getMonthlyDates,
  sumTotalForEachDataInRange,
  firstMonthTotal,
  lastMonthTotal,
  fullMonthsTotals,
  getLowestDate,
  getHighestDate,
  getMonthlyTotals,
  mergeResultsByType,
} from '../../../../../app/js/selectors/graph-data-helpers/'

import {
  formatDate,
  reverseDateStrings,
} from '../../../../../app/js/helpers/moment'

import {
  getGraphData,
} from '../../../../../app/js/selectors'

describe('Graph Data Helpers', () => {
  let state
  let data
  let range: Map<string, string|number>

  beforeEach(() => {
    state = {
      graphData: new Map({
        data: new Map(),
      }),
    }

    const path = moment()
    const todayPath = path.clone().format('YY/MM/DD').split('/')
    const yesterdayPath = path.clone()
                              .subtract(1, 'day')
                              .format('YY/MM/DD')
                              .split('/')
    const TwoDaysAgoPath = path.clone()
                                .subtract(2, 'day')
                                .format('YY/MM/DD')
                                .split('/')

    const pathArray = (p) => ['data'].concat(p).concat(['payingCustomersData'])

    state.graphData = state.graphData.setIn(pathArray(todayPath), 1)
    state.graphData = state.graphData.setIn(pathArray(yesterdayPath), 2)
    state.graphData = state.graphData.setIn(pathArray(TwoDaysAgoPath), 3)
    // state.graphData = state.graphData.setIn(pathArray(TwoDaysAgoPath).splice(0, 4))

    data = getGraphData(state)
    range = new Map({
      range: 'set',
      from: +moment().subtract(2, 'days').format('x'),
      to: +moment().format('x'),
    })
  })

  describe('#getDatesInRange()', () => {
    it('should accept a range', () => {
      expect(getDatesInRange.bind(null)).toThrow()
      expect(getDatesInRange.bind(null, 'range')).toThrow()
      expect(getDatesInRange.bind(null, 1)).toThrow()
      expect(getDatesInRange.bind(null, range)).toNotThrow()
    })

    // should reutrn a list of strings
    it('should return a list of strings', () => {
      expect(getDatesInRange(range)).toBeA(List)
      getDatesInRange(range).forEach((date) => {
        expect(date).toBeA('string')
      })
    })

    // format of the string should be 'YY/MM/DD'
    it('should dates in List should be formated as "YY/MM/DD"', () => {
      getDatesInRange(range).forEach((date) => {
        expect(date).toEqual(moment(date, 'YY/MM/DD').format('YY/MM/DD'))
      })
    })

    // should have eat least one entry
    it('should have at least one entry', () => {
      getDatesInRange(range).forEach((date) => {
        expect(date).toEqual(moment(date, 'YY/MM/DD').format('YY/MM/DD'))
      })

      expect(getDatesInRange(range).count()).toBe(3)

      range = new Map({
        range: 'set',
        from: +moment().subtract(1, 'day').format('x'),
        to: +moment().format('x'),
      })

      expect(getDatesInRange(range).count()).toBe(2)

      range = new Map({
        range: 'set',
        from: +moment().format('x'),
        to: +moment().format('x'),
      })

      expect(getDatesInRange(range).count()).toBe(1)
    })
  })

  describe('#getItemsByRange()', () => {
    let dates

    beforeEach(() => {
      dates = getDatesInRange(range)
    })
    // should return a List Of Maps
    it('should return a List of Maps', () => {
      expect(
        getItemsByRange(data, dates)
      ).toBeA(List)

      getItemsByRange(data, dates)
        .forEach((item) => {
          expect(item).toBeA(Map)
        })
    })

    // should throw when dates not passed in
    it('should throw when no arguments passed in', () => {
      expect(getItemsByRange.bind(null)).toThrow()
      expect(getItemsByRange.bind(null, data, dates)).toNotThrow()
    })
    // should throw when data not passed in
    it('should throw when data not passed in', () => {
      expect(getItemsByRange.bind(null)).toThrow()
      expect(getItemsByRange.bind(null, 'data')).toThrow()
      expect(getItemsByRange.bind(null, data)).toThrow()
      expect(getItemsByRange.bind(null, data, 'dates')).toThrow()
      expect(getItemsByRange.bind(null, data, dates)).toNotThrow()
    })

    // should throw when dates not passed in
    it('should throw when dates not passed in', () => {
      expect(getItemsByRange.bind(null, data, 'dates')).toThrow()
      expect(getItemsByRange.bind(null, data, dates)).toNotThrow()
      expect(getItemsByRange.bind(null, data, dates, 1)).toNotThrow()
    })

    // the Map should have a payingCustomersData entry
    it('should contain a Maps with payingCustomersData entry', () => {
      const path = moment()
      const TwoDaysAgoPath = path.clone()
                                  .subtract(2, 'day')
                                  .format('YY/MM/DD')
                                  .split('/')

      const pathArray = (p) => p.concat(['payingCustomersData'])
      data = data.setIn(pathArray(TwoDaysAgoPath).splice(0, 3))

      expect(
        getItemsByRange(data, dates)
          .forEach((entry) => {
            expect(entry.isEmpty() ? true : entry.has('payingCustomersData')).toBe(true)
          })
        )
    })
  })

  describe('#reverseDateStrings()', () => {
    // should take string 'YY/MM/DD' and convert it to 'DD/MM/YY'
    it('should take string "YY/MM/DD" and convert it to "DD/MM/YY"', () => {
      const dates = getDatesInRange(range)
      expect(
        reverseDateStrings(dates).last()
      ).toEqual(moment().format('DD/MM/YY'))
    })
  })

  describe('#getMonthlyDates()', () => {
    // should throw when no arguments
    it('should throw when no arguments', () => {
      expect(getMonthlyDates.bind(null)).toThrow()
    })

    // shoul dthrow when no range
    it('should throw when no range', () => {
      expect(getMonthlyDates.bind(null, 'range')).toThrow()
      expect(getMonthlyDates.bind(null, range)).toNotThrow()
    })

    // should retreive List of strings
    it('should retreive List of strings', () => {
      expect(getMonthlyDates(range)).toBeA(List)
      getMonthlyDates(range)
        .forEach((date) => expect(date).toBeA('string'))
    })

    // should retrieve minimum of 1 moneth
    it('should retrieve minimum of 1 month', () => {
      expect(getMonthlyDates(range).count()).toBeGreaterThan(0)
    })

    // list should be of a same length as months in range
    it('should be of a same length as months in range', () => {
      expect(getMonthlyDates(range).count()).toBe(1)

      range = range.set('from', +moment().subtract(2, 'months').format('x'))

      expect(getMonthlyDates(range).count()).toBe(3)

      range = range.set('from', +moment().subtract(1, 'months').format('x'))

      expect(getMonthlyDates(range).count()).toBe(2)
    })
  })

  describe('#sumTotalForEachDataInRange()', () => {
    let dates

    beforeEach(() => {
      range = range.set('from', moment(range.get('from'), 'x').startOf('month').format('x'))
                    .set('to', moment(range.get('to'), 'x').endOf('month').format('x'))
      dates = getDatesInRange(range)
    })
  // sumTotalForEachDataInRange
    // accepts data
    it('should throw if no arguments passed in in', () => {
      expect(sumTotalForEachDataInRange.bind(null)).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, data, dates)).toNotThrow()
    })
    // should throw when data not passed in
    it('should throw if no data passed in', () => {
      expect(sumTotalForEachDataInRange.bind(null)).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, 'data')).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, data)).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, data, 'dates')).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, data, dates)).toNotThrow()
    })

    // should throw if no dates passed in
    it('should throw if no dates passed in', () => {
      expect(sumTotalForEachDataInRange.bind(null, data, 'dates')).toThrow()
      expect(sumTotalForEachDataInRange.bind(null, data, dates)).toNotThrow()
      expect(sumTotalForEachDataInRange.bind(null, data, dates, 1)).toNotThrow()
    })
      // accepts dates
        // dates are lists of strings
      // reutrns Map or empty maps
    it('should return a Map or an empty Map', () => {
      expect(sumTotalForEachDataInRange(data, dates)).toBeA(Map)

      let count = 0
      getItemsByRange(data, dates)
        .forEach((mapItem) => {
          const value = mapItem.get('payingCustomersData')
          if (value) {
            count = count + value
          }
        })

      expect(
        sumTotalForEachDataInRange(data, dates).get('payingCustomersData')
      ).toBe(count)


      const path = moment()
      const todayPath = path.clone().format('YY/MM/DD').split('/')
      const yesterdayPath = path.clone()
                                .subtract(1, 'day')
                                .format('YY/MM/DD')
                                .split('/')
      const TwoDaysAgoPath = path.clone()
                                  .subtract(2, 'day')
                                  .format('YY/MM/DD')
                                  .split('/')

      const pathArray = (p) => ['data'].concat(p)

      state.graphData = state.graphData.setIn(pathArray(todayPath))
      state.graphData = state.graphData.setIn(pathArray(yesterdayPath))
      state.graphData = state.graphData.setIn(pathArray(TwoDaysAgoPath))

      data = state.graphData.get('data')

      expect(sumTotalForEachDataInRange(data, dates).isEmpty()).toBe(true)
    })
  })

  describe('#firstMonthTotal()', () => {
    it('should throw if no arguments passed in', () => {
      expect(firstMonthTotal.bind(null)).toThrow()
      expect(firstMonthTotal.bind(null, data, range)).toNotThrow()
      firstMonthTotal(data, range)
    })
    // should throw when data not passed in
    it('should throw if no data passed in', () => {
      expect(firstMonthTotal.bind(null)).toThrow()
      expect(firstMonthTotal.bind(null, 'data')).toThrow()
      expect(firstMonthTotal.bind(null, data)).toThrow()
      expect(firstMonthTotal.bind(null, data, 'range')).toThrow()
      expect(firstMonthTotal.bind(null, data, range)).toNotThrow()
    })

    // should throw if no range passed in
    it('should throw if no range passed in', () => {
      expect(firstMonthTotal.bind(null, data, 'range')).toThrow()
      expect(firstMonthTotal.bind(null, data, range)).toNotThrow()
      expect(firstMonthTotal.bind(null, data, range, 1)).toNotThrow()
    })

    it('should return a List of Maps', () => {
      const result = firstMonthTotal(data, range)
      expect(result).toBeA(List)
      result.forEach((item) => {
        expect(item).toBeA(Map)
      })
      expect(result.count()).toBe(1)
    })
  })

  describe('lastMonthTotal', () => {
    it('should throw if no arguments passed in', () => {
      expect(lastMonthTotal.bind(null)).toThrow()
      expect(lastMonthTotal.bind(null, data, range)).toNotThrow()
      lastMonthTotal(data, range)
    })
    // should throw when data not passed in
    it('should throw if no data passed in', () => {
      expect(lastMonthTotal.bind(null)).toThrow()
      expect(lastMonthTotal.bind(null, 'data')).toThrow()
      expect(lastMonthTotal.bind(null, data)).toThrow()
      expect(lastMonthTotal.bind(null, data, 'range')).toThrow()
      expect(lastMonthTotal.bind(null, data, range)).toNotThrow()
    })

    // should throw if no range passed in
    it('should throw if no range passed in', () => {
      expect(lastMonthTotal.bind(null, data, 'range')).toThrow()
      expect(lastMonthTotal.bind(null, data, range)).toNotThrow()
      expect(lastMonthTotal.bind(null, data, range, 1)).toNotThrow()
    })

    it('should return a List of Maps', () => {
      const result = lastMonthTotal(data, range)
      expect(result).toBeA(List)
      result.forEach((item) => {
        expect(item).toBeA(Map)
      })
      expect(result.count()).toBe(1)
    })
  })

  // fullMonthsTotals
  describe('#fullMonthsTotals()', () => {
    let options
    let dates
    beforeEach(() => {
      state = {
        graphData: new Map({
          data: new Map(),
        }),
      }

      range = new Map({
        range: 'set',
        from: +moment().subtract(3, 'months').format('x'),
        to: +moment().format('x'),
      })

      dates = getDatesInRange(range)

      options = ['payingCustomersData', 'openIssuesData']
      const pathArray = (p, choice) => ['data'].concat(p).concat([options[choice]])
      let undef
      const dddd = {
        payingCustomersData: random(10),
        openIssuesData: new Map({
          [random(199)]: undef,
        }),
      }

      dates.forEach((date) => {
        const choice = random(1)
        state.graphData = state.graphData.setIn(pathArray(date.split('/'), choice), dddd[options[choice]])
      })

      data = getGraphData(state)
      dates = getMonthlyDates(range)
    })
    // should accpet data
    it('should throw when no arguments passed in', () => {
      expect(fullMonthsTotals.bind(null)).toThrow()
      expect(fullMonthsTotals.bind(null, data, dates)).toNotThrow()
    })
    // should throw when data not passed in
    it('should throw when data not passed in', () => {
      expect(fullMonthsTotals.bind(null)).toThrow()
      expect(fullMonthsTotals.bind(null, 'data')).toThrow()
      expect(fullMonthsTotals.bind(null, data)).toThrow()
      expect(fullMonthsTotals.bind(null, data, 'dates')).toThrow()
      expect(fullMonthsTotals.bind(null, data, dates)).toNotThrow()
    })

    // should throw when dates not passed in
    it('should throw when dates not passed in', () => {
      expect(fullMonthsTotals.bind(null, data, 'dates')).toThrow()
      expect(fullMonthsTotals.bind(null, data, dates)).toNotThrow()
      expect(fullMonthsTotals.bind(null, data, dates, 1)).toNotThrow()
    })

    // should return List of Maps
    it('should return List of Maps', () => {
      const result = fullMonthsTotals(data, dates)
      expect(result).toBeA(List)
      result.forEach((item) => {
        expect(item).toBeA(Map)
      })
    })

    // list of maps should be of the length of the monts in range
    it('list of maps should be of the length of the monts in range', () => {
      const result = fullMonthsTotals(data, dates)
      expect(result.count()).toBe(dates.count())
    })

    it('should have length of one if range is only within one month', () => {
      range = new Map({
        range: 'set',
        from: +moment().subtract(3, 'days').format('x'),
        to: +moment().format('x'),
      })
      dates = getMonthlyDates(range)
      const result = fullMonthsTotals(data, dates)
      expect(result.count()).toBe(1)
    })

    it('should have length of 2 if range within 2 months is passed in', () => {
      range = new Map({
        range: 'set',
        from: +moment().subtract(1, 'month').format('x'),
        to: +moment().format('x'),
      })
      dates = getMonthlyDates(range)
      const result = fullMonthsTotals(data, dates)
      expect(result.count()).toBe(2)
    })

    it('should have length of 3 or more if 3 or more months are passed in range', () => {
      range = new Map({
        range: 'set',
        from: +moment().subtract(2, 'month').format('x'),
        to: +moment().format('x'),
      })
      dates = getMonthlyDates(range)
      let result = fullMonthsTotals(data, dates)
      expect(result.count()).toBe(3)

      range = new Map({
        range: 'set',
        from: +moment().subtract(4, 'month').format('x'),
        to: +moment().format('x'),
      })
      dates = getMonthlyDates(range)
      result = fullMonthsTotals(data, dates)
      expect(result.count()).toBe(5)
    })

    //
    it('should use sumTotalForEachDataInRange correctly', () => {
      const monthWeUse = dates.first()
      const thisMonthRange = new Map({
        range: 'set',
        from: +moment(monthWeUse, 'YY/MM/DD').startOf('month').format('x'),
        to: +moment(monthWeUse, 'YY/MM/DD').endOf('month').format('x'),
      })
      const datesInMonth = getDatesInRange(thisMonthRange)
      const sumTotalForMonthWeUse = sumTotalForEachDataInRange(data, datesInMonth)

      expect(
        fullMonthsTotals(data, dates).first()
      ).toEqual(sumTotalForMonthWeUse)
    })
  })

  describe('#mergeResultsByType()', () => {
    let options
    let dates
    beforeEach(() => {
      state = {
        graphData: new Map({
          data: new Map(),
        }),
      }

      range = new Map({
        range: 'set',
        from: +moment().subtract(3, 'months').format('x'),
        to: +moment().format('x'),
      })

      dates = getDatesInRange(range)

      options = ['payingCustomersData', 'openIssuesData']
      const pathArray = (p, choice) => ['data'].concat(p).concat([options[choice]])
      let undef
      const dddd = {
        payingCustomersData: random(10),
        openIssuesData: new Map({
          [random(199)]: undef,
        }),
      }

      dates.forEach((date) => {
        const choice = random(1)
        state.graphData = state.graphData.setIn(pathArray(date.split('/'), choice), dddd[options[choice]])
      })

      data = getGraphData(state)
      dates = getMonthlyDates(range)
    })
    //
    // let options
    // beforeEach(() => {
    //
    //   // empty state
    //   state = {
    //     graphData: new Map({
    //       data: new Map(),
    //     }),
    //   }
    //
    //   range = new Map({
    //     range: 'set',
    //     from: +moment().subtract(3, 'months').format('x'),
    //     to: +moment().format('x'),
    //   })
    //
    //   const dates = getDatesInRange(range)
    //
    //   options = ['payingCustomersData', 'openIssues']
    //   const pathArray = (p) => ['data'].concat(p).concat([options[random(1)]])
    //
    //   dates.forEach((date) => {
    //     state.graphData = state.graphData.setIn(pathArray(date.split('/')), random(10))
    //   })
    //
    //   data = getGraphData(state)
    // })
    // //
    it('should merge correctly', () => {
      const fullRange: Map = new Map({
        from: formatDate(getLowestDate(data)),
        to: formatDate(getHighestDate(data)),
      })
      const result = getMonthlyTotals(data, fullRange)
      // console.log(data.toJS())
      // console.log(result.toJS())
      const merged = mergeResultsByType(result, options)

      // console.log(merged.toJS())

      expect(merged.count()).toBe(result.get('dates').count())
    })
  })

  // getTotalsByRange
})
