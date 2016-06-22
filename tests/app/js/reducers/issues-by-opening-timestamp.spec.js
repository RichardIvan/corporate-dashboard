'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { List, fromJS, toJS } from 'immutable'

import flatten from 'lodash/flatten'

import reducer from '../../../../app/js/reducers/issues-by-opening-timestamp'

import { getMiniCSV } from './helpers'
import { transformCSVtoJSON } from '../../../../app/js/reducers/helpers'

describe('Issues by opening timestamp reducer', () => {

  // const state = List.of()

  // beforeEach()
  it('should have 10 items on initialization', () => {

    const csv = getMiniCSV()
    const json = transformCSVtoJSON(csv)

    const action = {
      type: 'INIT_LOAD',
    }
    const newState = reducer(undefined, action)

    const array = new Array(10).fill(List.of())
    const result = fromJS(array)
    // console.dir(JSON.parse(result.toJS()), {depth: null, colors: true})

    expect(newState.count()).toEqual(result.count())
  })

  it('should have 10 items on INIT_LOAD with CSV payload', () => {

    const csv = getMiniCSV()
    const json = transformCSVtoJSON(csv)

    const action = {
      type: 'INIT_LOAD',
      payload: {
        data: csv,
      },
    }
    const state = fromJS(new Array(10).fill(List.of()))
    const newState = reducer(state, action)

    const array = new Array(10).fill(List.of())
    const result = fromJS(array)
    // console.dir(JSON.parse(result.toJS()), {depth: null, colors: true})

    expect(newState.count()).toEqual(result.count())
  })

  it('should be array')

  it('should have items that are arrays of ids and timestamps')


})
