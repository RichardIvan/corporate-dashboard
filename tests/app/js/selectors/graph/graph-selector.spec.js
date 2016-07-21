/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import moment from 'moment'

import {
  Map,
  List
} from 'immutable'

import {
  getGraphData,
  getGraphDataByRange
} from '../../../../../app/js/selectors/graph-data'

describe('Graph Data Selector', () => {
  let state

  beforeEach(() => {
    state = {
      graphData: new Map({
        data: new Map()
      })
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
  })

  describe('#getGraphData()', () => {
    // it should have a state parameter
    it('should have a state parameter passed in', () => {
      expect(getGraphData.bind(null)).toThrow('missing state argument')
      expect(getGraphData.bind(null, state)).toNotThrow()
    })
    // it should return a Map
    it('should return a Map', () => {
      expect(getGraphData(state)).toBeA(Map)
    })
  })

  describe('#getGraphDataByRange()', () => {
    let data
    let range: Map<string, string|number>
    let types: List<string>
    beforeEach(() => {
      data = getGraphData(state)
      types = List.of('payingCustomersData')
      range = new Map({
        range: 'set',
        from: +moment().subtract(2, 'days').format('x'),
        to: +moment().format('x')
      })
    })
    // should return a map
    it('should return a List', () => {
      expect(getGraphDataByRange(data, range, types)).toBeA(List)
    })

    // should accept 2 arguments
    it('should accept 3 arguments', () => {
      expect(getGraphDataByRange.bind(null)).toThrow('incorrect argument(s)')
      expect(getGraphDataByRange.bind(null, data)).toThrow('incorrect argument(s)')
      expect(getGraphDataByRange.bind(null, data, range)).toThrow('incorrect argument(s)')
      expect(getGraphDataByRange.bind(null, data, range, types)).toNotThrow()
    })

    // should not throw when passed "set" range
    it('should not throw when passed "set" range', () => {
      expect(getGraphDataByRange.bind(null, data, range, types)).toNotThrow()
    })

    // should not throw when passed "all" range
    it('should not throw when passed "all" range', () => {
      const newRange = range.set('range', 'all')
      const info = Map({
        lowestDate: moment().subtract(1, 'months').format('YY/MM/DD'),
        highestDate: moment().format('YY/MM/DD')
      })

      expect(getGraphDataByRange.bind(null, data, newRange, types, info)).toNotThrow()
    })

    // should throw if passed incorrect argument types
    it('should throw if passed incorrect argument types', () => {
      expect(
        getGraphDataByRange.bind(null, 'data', range, types)
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, 'data', 'range', types)
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, 'data', 'range', 'types')
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, data, 'range', types)
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, data, 'range', 'types')
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, data, range, 'types')
      ).toThrow('incorrect argument(s)')
      expect(
        getGraphDataByRange.bind(null, data, range, types)
      ).toNotThrow()
    })

    // should throw if range has no "all" or "set" range type
    it('should throw if range has no "all" or "set range type"', () => {
      expect(
        getGraphDataByRange.bind(null, data, range.set('range', null), types)
      ).toThrow('incorrect range type')
      expect(
        getGraphDataByRange.bind(null, data, range, types)
      ).toNotThrow()
    })
  })
})
