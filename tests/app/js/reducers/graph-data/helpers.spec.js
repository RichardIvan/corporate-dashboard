/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import is from 'is_js'

import moment from 'moment'
import {
  Map,
} from 'immutable'

import {
  map,
  keys,
  first,
  random,
} from 'lodash'

import get from 'lodash/nth'

import {
  constructRange,
  constructPath,
  fillIssues,
  addOpenIssuesData,
} from '../../../../../app/js/reducers/graph-data/helpers'

import {
  getDatesInRange,
} from '../../../../../app/js/selectors/graph-data-helpers/general-graph-data-helpers'

import {
  getGraphData,
} from '../../../../../app/js/selectors'

describe('Graph Data Reducer Helper', () => {
  let issues

  let firstIssue
  let secondIssue
  let options

  let data
  let state
  let range

  let reducersState

  let path4daysAgo
  let pathInrangeForFirstIssue
  let pathInrangeForSecondIssue
  beforeEach(() => {
    issues = {
      aaaa: {
        opening_timestamp: {
          original: +moment().startOf('day').subtract(3, 'days').format('x'),
        },
        closing_timestamp: {
          original: +moment().startOf('day').subtract(1, 'days').format('x'),
        },
        open_status: {
          original: false,
        },
        id: {
          original: 'aaaa',
        },
      },
      bbbb: {
        opening_timestamp: {
          original: +moment().startOf('day').subtract(3, 'days').format('x'),
        },
        closing_timestamp: {
          original: '',
        },
        open_status: {
          original: true,
        },
        id: {
          original: 'bbbb',
        },
      },
    }

    const issueKeys = keys(issues)
    firstIssue = issues[first(issueKeys)]
    secondIssue = issues[get(issueKeys, 1)]

    // empty state
    state = {
      graphData: new Map({
        data: new Map(),
      }),
    }

    // range
    range = new Map({
      range: 'set',
      from: +moment().subtract(3, 'months').format('x'),
      to: +moment().format('x'),
    })


    const dates = getDatesInRange(range)

    options = ['payingCustomersData', 'openIssues']
    const pathArray = (p) => ['data'].concat(p).concat([options[random(1)]])

    // fill the state
    dates.forEach((date) => {
      state.graphData = state.graphData.setIn(pathArray(date.split('/')), random(10))
    })

    data = getGraphData(state)

    const m4DaysAgo = moment().subtract(4, 'days').startOf('day').format('YY/MM/DD')


    const dateInRange = moment(firstIssue.opening_timestamp.original, 'x')
                          .startOf('day')
                          .format('YY/MM/DD')


    path4daysAgo = constructPath(['data'], m4DaysAgo)
    const todaysDate = moment().startOf('day').format('YY/MM/DD')
    pathInrangeForFirstIssue = constructPath(['data'], dateInRange)
    pathInrangeForSecondIssue = constructPath(['data'], todaysDate)

    reducersState = state.graphData
  })
  describe('#constructRange()', () => {

    it('should return a map', () => {
      map(issues, (issue) => {
        expect(constructRange(issue)).toBeA(Map)
      })
    })
    // should construct end time based on open status
    it('should construct end time based on open status', () => {
      expect(constructRange(firstIssue)).toEqual(new Map({
        from: +moment().subtract(3, 'days')
                        .startOf('day')
                        .format('x'),
        to: +moment().subtract(1, 'days')
                      .startOf('day')
                      .format('x'),
      }))

      expect(constructRange(secondIssue)).toEqual(new Map({
        from: +moment().startOf('day')
                        .subtract(3, 'days')
                        .format('x'),
        to: +moment().startOf('day')
                      .format('x'),
      }))
    })

    // should have from and to keys
    it('should have from and to keys', () => {
      map(issues, (issue) => {
        const result = constructRange(issue)
        expect(result.has('from')).toBe(true)
        expect(result.has('to')).toBe(true)
      })
    })

    // keys should be numbers
    it('values should be numbers', () => {
      map(issues, (issue) => {
        const result = constructRange(issue)
        expect(result.get('from')).toBeA('number')
        expect(result.get('to')).toBeA('number')
      })
    })
  })

  describe('#constructPath()', () => {
    let path
    let date
    beforeEach(() => {
     path = ['data']
     date = moment().format('YY/MM/DD')
    })
    // should return an array with strings
    it('should return an array with strings', () => {
      const result = constructPath(path, date)
      expect(is.array(result)).toBe(true)
      expect(is.all.string(result)).toBe(true)
    })

    // should return array of length of path arr + 3 + 1 as endpoint
    it('should return array of strings with length 5', () => {
      const result = constructPath(path, date)

      expect(result.length).toBe(5)
    })
  })

  describe('#fillIssues()', () => {


    // should return Map
    it('should return a Map', () => {
      const result = fillIssues(state.graphData, firstIssue)
      expect(Map.isMap(result)).toBe(true)
    })
    // should add a new entry to a map at the endpoint is there isnt opening_timestamp
    it('should add a new entry to a map at the endpoint is there isnt opening_timestamp', () => {


      // console.log(state)
      let result = fillIssues(reducersState, firstIssue)

      expect(is.undefined(result.getIn(path4daysAgo))).toBe(true)
      expect(is.undefined(result.getIn(pathInrangeForFirstIssue))).toBe(false)

      result = fillIssues(reducersState, secondIssue)
      expect(is.undefined(result.getIn(path4daysAgo))).toBe(true)
      expect(is.undefined(result.getIn(pathInrangeForSecondIssue))).toBe(false)
    })

    // this new entry should be a Map
    it('should create new entry with type of Map', () => {
      let result = fillIssues(reducersState, firstIssue)
      expect(result.getIn(pathInrangeForFirstIssue)).toBeA(Map)

      result = fillIssues(reducersState, secondIssue)
      expect(result.getIn(pathInrangeForSecondIssue)).toBeA(Map)
    })

    // new entry should be id of an issue
    it('should create a entry with a key of the issue', () => {
      let issueID = first(keys(issues))

      let result = fillIssues(reducersState, firstIssue)
      expect(result.getIn(pathInrangeForFirstIssue).has(issueID)).toBe(true)

      issueID = get(keys(issues), 1)

      result = fillIssues(reducersState, secondIssue)
      expect(result.getIn(pathInrangeForSecondIssue).has(issueID)).toBe(true)
    })


    // should not do anyting if there is already an antry at that date
    it('should not do anyting if there is already an antry at that date', () => {
      let issueID = first(keys(issues))

      let result = fillIssues(reducersState, firstIssue)
      expect(result.getIn(pathInrangeForFirstIssue).has(issueID)).toBe(true)
      expect(
        fillIssues(result, firstIssue).getIn(pathInrangeForFirstIssue)
                                      .has(issueID)
      ).toBe(true)

      issueID = get(keys(issues), 1)

      result = fillIssues(reducersState, secondIssue)
      expect(result.getIn(pathInrangeForSecondIssue).has(issueID)).toBe(true)
      expect(
        fillIssues(result, secondIssue).getIn(pathInrangeForSecondIssue)
                                      .has(issueID)
      ).toBe(true)
    })
    describe('addOpenIssuesData()', () => {
      // should correctly add all the issues
      it('should correctly add all the issues', () => {
        const result = addOpenIssuesData(reducersState, issues)

        let issueID = first(keys(issues))
        expect(result.getIn(pathInrangeForFirstIssue).has(issueID)).toBe(true)

        issueID = get(keys(issues), 1)
        expect(result.getIn(pathInrangeForSecondIssue).has(issueID)).toBe(true)
      })
    })
  })
})
