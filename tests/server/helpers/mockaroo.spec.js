/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'
import freeze from 'deep-freeze-node'

//
// import { fetchMockaroo } from '../../../server/src/helpers'
//
// fetchMockaroo().then(results => console.log(results))
//
// describe('Mackaroo', () => {
//   it('should return an promise', function() {
//     this.timeout(5000)
//
//     // return Promise.resolve()
//
//     return fetchMockaroo().then(text => console.log(text))
//     // .then((records) => {
//     //   expect(records).toBe(true)
//     // }).catch((err) => err)
//
//     // return fetchMockaroo().catch((e) => {
//     //   expect(e.message).to.equal('fail')
//     // })
//   })
// })

import {
  fillIDs,
  fillLocation,
  fillOpeningTimestamp,
  fillClosingTimestamp,
} from '../../../server/src/helpers'

import { locations } from '../../../server/src/data'

import { mockedResponse } from './helpers'

describe('Mockaroo', () => {
  it('receives a row in JSON format', () => {
    const json = freeze(mockedResponse())
    expect(typeof json).toBe('object')
    expect(json[0].id).toBe(null)
    expect(typeof json[0].name).toBe('string')
  })

  it('fills issue ID', () => {
    const json = freeze(mockedResponse())
    const transformed = fillIDs(json)
    expect(typeof transformed[0].id).toBe('string')
    expect(typeof transformed[1].id).toBe('string')

    expect(transformed[0].id).toNotBe(null)
    expect(transformed[1].id).toNotBe(null)
  })

  it('fills a location', () => {
    const json = freeze(mockedResponse())
    const transformed = fillLocation(json)

    expect(locations.indexOf(transformed[0].location)).toBeGreaterThan(-1)
    expect(transformed[0].location).toNotBe(null)
    expect(transformed[1].location).toNotBe(null)
  })

  it('fills opening_timestamp', () => {
    const json = freeze(mockedResponse())
    const transformed = fillOpeningTimestamp(json)

    // maybe add tests that this wont be higher number than the present timestamp
    expect(typeof transformed[0].opening_timestamp).toBe('number')
    expect(typeof transformed[1].opening_timestamp).toBe('number')

    expect(transformed[0].opening_timestamp).toNotBe(null)
    expect(transformed[1].opening_timestamp).toNotBe(null)

    const year = new Date(transformed[1].opening_timestamp).getFullYear()

    expect(year).toBeLessThanOrEqualTo(2016)
    expect(year).toBeGreaterThanOrEqualTo(2015)
  })

  it('fills closing timestamp', () => {
    const json = freeze(mockedResponse())

    let transformed = fillOpeningTimestamp(json)
    transformed = fillClosingTimestamp(transformed)

    expect(typeof transformed[0].closing_timestamp).toBe('number')
    expect(transformed[1].closing_timestamp).toBe(null)
    expect(transformed[0].opening_timestamp).toNotBe(null)

    let year = new Date(transformed[0].closing_timestamp).getFullYear()
    expect(year).toBeLessThanOrEqualTo(2016)
    expect(year).toBeGreaterThanOrEqualTo(2015)

    year = new Date(transformed[1].closing_timestamp).getFullYear()
    expect(year).toBe(1970)
  })
})
