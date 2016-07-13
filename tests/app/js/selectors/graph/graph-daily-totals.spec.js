/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import moment from 'moment'
import {
  Map,
  List,
} from 'immutable'

import {
  getDailyTotals,
} from '../../../../../app/js/selectors/graph-data-helpers'

import {
  getGraphData,
} from '../../../../../app/js/selectors'

describe('Graph Data Daily Selector', () => {
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
  describe('#getDailyTotals()', () => {
    // should throw when dates not passed in
    it('should throw if no arguments passed in in', () => {
      expect(getDailyTotals.bind(null)).toThrow()
      expect(getDailyTotals.bind(null, data, range)).toNotThrow()
    })
    // should throw when data not passed in
    it('should throw if no data passed in', () => {
      expect(getDailyTotals.bind(null)).toThrow()
      expect(getDailyTotals.bind(null, 'data')).toThrow()
      expect(getDailyTotals.bind(null, data)).toThrow()
      expect(getDailyTotals.bind(null, data, 'range')).toThrow()
      expect(getDailyTotals.bind(null, data, range)).toNotThrow()
    })

    // should throw if no range passed in
    it('should throw if no range passed in', () => {
      expect(getDailyTotals.bind(null, data, 'range')).toThrow()
      expect(getDailyTotals.bind(null, data, range)).toNotThrow()
      expect(getDailyTotals.bind(null, data, range, 1)).toNotThrow()
    })

    // should return a Map
    it('should return a Map', () => {
      expect(getDailyTotals(data, range)).toBeA(Map)
    })

    // mapShould have 2 keys
    it('should have 2 keys', () => {
      expect(getDailyTotals(data, range).keySeq().count()).toBe(2)
    })

    // dates in map should be a list of strings
    it('dates in map should be a list of strings', () => {
      expect(getDailyTotals(data, range).get('dates')).toBeA(List)
      getDailyTotals(data, range).get('dates')
        .forEach((date) => expect(date).toBeA('string'))
    })

    // totals should be a list of maps
    it('totals should be a list of maps', () => {
      expect(getDailyTotals(data, range).get('totals')).toBeA(List)
      getDailyTotals(data, range).get('totals')
        .forEach((total) => expect(total).toBeA(Map))
    })
  })
})
