/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'
import { Map, fromJS } from 'immutable'

import expectImmutable from 'expect-immutable'
expect.extend(expectImmutable)


import reducer from '../../../../app/js/reducers/issues.js'
import { getMockedCSV } from './helpers'
import { transformCSVtoJSON } from '../../../../app/js/reducers/helpers'
import { generateShortVersions } from '../../../../app/js/helpers/generators'

describe('Issues Reducer', () => {
  describe('#INIT_LOAD', () => {
    it('returns an object on initialization', () => {
      let state
      const action = {
        type: 'INIT_LAOD',
      }
      const newState = reducer(state, action)

      expect(newState).toEqual(Map())
    })

    it('is immutable', () => {
      const state = Map({})
      const action = {
        type: 'INIT_LAOD',
        payload: {
          '1': {
            id: 1,
          },
        },
      }
      reducer(state, action)

      expect(state).toEqual(state)
    })

    it('parses CSV to JSON', () => {
      const csv = getMockedCSV()

      const json = transformCSVtoJSON(csv)
      // console.log(json)

      const state = Map()
      const action = {
        type: 'INIT_LOAD',
        payload: {
          data: csv,
        },
      }
      const nextState = reducer(state, action)

      expect(nextState).toEqual(fromJS(generateShortVersions(json)))
    })
  })

  describe('#NEW_ISSUE', () => {
    it('should have add new issue to issues by ID map', () => {

      const state = Map({
        '5dc28a93-88d8-453e-865e-da5f4194c7b9': Map({
          id: '5dc28a93-88d8-453e-865e-da5f4194c7b9',
          opening_timestamp: 1464446948285,
          closing_timestamp: null,
          name: 'Cheryl Thompson',
          email_address: 'rferguson0@fc2.com',
          description: 'Integer non velit.',
          open_status: true,
          employee_name: 'Randy Ferguson',
          location: 'Village',
        }),
      })

      const json = [{
        id: '536737bf-89fc-443a-aabc-67b0ff7d8b7b',
        opening_timestamp: 1459461111348,
        closing_timestamp: 1462021152937,
        name: 'Joan Simpson',
        email_address: 'acox0@issuu.com',
        description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        open_status: false,
        employee_name: 'Andrew Cox',
        location: 'Village',
      },
      ]

      const finalState = Map({
        '5dc28a93-88d8-453e-865e-da5f4194c7b9': Map({
          id: '5dc28a93-88d8-453e-865e-da5f4194c7b9',
          opening_timestamp: 1464446948285,
          closing_timestamp: null,
          name: 'Cheryl Thompson',
          email_address: 'rferguson0@fc2.com',
          description: 'Integer non velit.',
          open_status: true,
          employee_name: 'Randy Ferguson',
          location: 'Village',
        }),
        '536737bf-89fc-443a-aabc-67b0ff7d8b7b': Map({
          id: '536737bf-89fc-443a-aabc-67b0ff7d8b7b',
          opening_timestamp: 1459461111348,
          closing_timestamp: 1462021152937,
          name: 'Joan Simpson',
          email_address: 'acox0@issuu.com',
          description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
          open_status: false,
          employee_name: 'Andrew Cox',
          location: 'Village',
        }),
      })

      const action = {
        type: 'NEW_ISSUE',
        payload: {
          data: json,
        },
      }
      const newState = reducer(state, action)
      expect(Object.keys(newState)).toEqual(Object.keys(fromJS(finalState)))
    })
  })
})
