'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List, fromJS, toJS } from 'immutable'

import flatten from 'lodash/flatten'

import reducer from '../../../../app/js/reducers/issues-by-opening-timestamp'

import { getMiniCSV } from './helpers'
import { transformCSVtoJSON } from '../../../../app/js/reducers/helpers'

describe('Issues by opening timestamp reducer', () => {

  // const state = List.of()


  // beforeEach()
  describe('#INIT_LOAD', function () {

    let csv, json

    beforeEach(function () {
      csv = getMiniCSV()
      json = transformCSVtoJSON(csv)
    })
    // body...
    it('should have 10 items on initialization', () => {

      const action = {
        type: 'INIT_LOAD',
      }
      const newState = reducer(undefined, action)

      const array = new Array(10).fill(List.of())
      const expectedResult = fromJS(array)
      // console.dir(JSON.parse(result.toJS()), {depth: null, colors: true})

      expect(newState.count()).toEqual(expectedResult.count())
    })

    it('should have 10 items on INIT_LOAD with CSV payload', () => {

      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }
      const state = fromJS(new Array(10).fill(List.of()))
      const newState = reducer(state, action)

      const array = new Array(10).fill(List.of())
      const expectedResult = fromJS(array)
      // console.dir(JSON.parse(result.toJS()), {depth: null, colors: true})

      expect(newState.count()).toEqual(expectedResult.count())
    })

    it('should be a List', () => {

      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }

      const state = fromJS(new Array(10).fill(List.of()))
      const newState = reducer(state, action)

      expect(List.isList(newState)).toBe(true)

    })

    it('should have items that are Lists of ids and timestamps', () => {

      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }

      const state = fromJS(new Array(10).fill(List.of()))
      const newState = reducer(state, action)

      expect(List.isList(newState.first())).toBe(true)
      expect(newState.first().first().includes('abcd')).toBe(true)
      expect(newState.first().includes('1454146495766')).toBe(true)

      expect(List.isList(newState.last())).toBe(true)
      expect(newState.last().isEmpty()).toBe(true)
    })

    // TODO write a test that makes sure that the timestamp is a number

    it('should return ordered List of List items by timestamp in anscending order', () => {
      const state = fromJS(new Array(10).fill(List.of()))
      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }

      const newState = reducer(state, action)

      expect(newState.first().first().includes('iiii')).toBe(true)
      expect(newState.first().includes(1440864124169)).toBe(true)

      expect(newState.get(1).first().includes('hhhh')).toBe(true)
      expect(newState.get(1).includes(1440864174169)).toBe(true)
    })
  })

  describe('#NEW_ISSUE', function () {
    // body...

    let json
    let csv
    let state

    beforeEach(() => {
      csv = getMiniCSV()
      json = transformCSVtoJSON(csv)
      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }
      state = reducer(undefined, action)

    })


    // TODO add a test that will check that the item is being appended there if there is less items than 10
    it('should return the same array if the timestamp is higher value than the last', () => {

      const newIssue = [
        {
          id: 'zzzz',
          opening_timestamp: 7777777777777
        }
      ]


      const action = {
        type: 'NEW_ISSUE',
        payload: {
          data: newIssue,
        },
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(state)

    })

    it.only('should retrun array with the new and lowest value at the beginning', () => {
      const newIssue = [
        {
          id: 'zzzz',
          opening_timestamp: 1
        }
      ]

      const action = {
        type: 'NEW_ISSUE',
        payload: {
          data: newIssue,
        },
      }
      const newState = reducer(state, action)

      expect(newState.first().includes(1)).toEqual(true)
    })
    //
    // it('should return List of items that are sorted in ascending order', () => {
    //
    // })
  })


})
