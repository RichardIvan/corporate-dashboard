/* @flow */
'use strict'

import moment from 'moment'

import { describe, it } from 'mocha'
import expect from 'expect'

import { isFSA } from 'flux-standard-action';

import { setRange } from '../../../../app/js/actions'

describe('setRange actio creaator', () => {
  it('should throw if there is no payload passed in', () => {
    expect(setRange).toThrow()
  })

  // it should throw if there is no range passed in
  it('should throw if there is no range passed in', () => {
    const payload = {}

    expect(setRange.bind(null, payload)).toThrow()
  })

  //should throw if there is no recognized range passed in
  it('should throw if there is not recognize range passed in', () => {
    const payload = {
      range: 'norange',
    }

    expect(setRange.bind(null, payload)).toThrow()
  })

  // it should thwrow if there is not from or no to passed in
  // whe the range is of type 'set'
  it('should throw if there is no from or no to passed in with the "set" range', () => {
    let payload = {
      range: 'set',
    }
    expect(setRange.bind(null, payload)).toThrow()

    payload = {
      range: 'set',
      from: '',
      to: '',
    }
    expect(setRange.bind(null, payload)).toThrow()

    payload = {
      range: 'set',
      from: 123,
      to: 1234,
    }
    expect(setRange.bind(null, payload)).toNotThrow()
  })

  // it should not throw if only from or only to is passed in
  it('should not throw if only from or only to is passed in', () => {
    let payload = {
      range: 'set',
      from: '',
      to: 123,
    }
    expect(setRange.bind(null, payload)).toNotThrow()

    payload = {
      range: 'set',
      from: 123,
      to: '',
    }
    expect(setRange.bind(null, payload)).toNotThrow()

  })

  it('should calculate from number if only to is being passed in', () => {
    const from = +moment().startOf('day').subtract(8, 'days').format('x')
    const to = +moment().startOf('day').subtract(1, 'days').format('x')

    const payload = {
      range: 'set',
      from: '',
      to: to,
    }
    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: from,
        to: to,
      }
    })
  })

  it('should calculate to number if only from is being passed', () => {
    const from = +moment().startOf('day').subtract(8, 'days').format('x')
    const to = +moment().startOf('day').subtract(1, 'days').format('x')

    const payload = {
      range: 'set',
      from: from,
      to: '',
    }
    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: from,
        to: to,
      }
    })
  })

  it('should set range 7 days from now till present if from is sooner than 6 days from today', () => {
    const from = +moment().startOf('day').subtract(6, 'days').format('x')
    const to = +moment().startOf('day').format('x')

    const payload = {
      range: 'set',
      from: from,
      to: '',
    }
    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(7, 'days').format('x'),
        to: to,
      }
    })
  })

  it('should set range 7 days from now till present if to is later than today', () => {
    const from = +moment().startOf('day').subtract(7, 'days').format('x')
    const to = +moment().startOf('day').add(1, 'day').format('x')

    const payload = {
      range: 'set',
      from: '',
      to: to,
    }
    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: from,
        to: +moment().startOf('day').format('x'),
      }
    })
  })

  // it should set range for 'all' correctly
  it('should set range for "all" correctly', () => {
    let payload = {
      range: 'all'
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'all',
      }
    })

    payload = {
      range: 'all',
      something: 'extra',
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'all',
      }
    })
  })

  // it should create correct action for 'set'
  it('should create correct action for "set"', () => {
    const from = +moment().startOf('day').subtract(7, 'days').format('x')
    const to = +moment().startOf('day').format('x')

    let payload = {
      range: 'set',
      from: from,
      to: to,
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: from,
        to: to,
      },
    })

    payload = {
      range: 'set',
      from: from,
      to: to,
      something: 'extra',
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: from,
        to: to,
      },
    })
  })

  // it should create correct action when next type is being passed in payload
  it('should create correct action when next type is bying passed in payload', () => {
    const from = +moment().startOf('day').subtract(14, 'days').format('x')
    const to = +moment().startOf('day').subtract(7, 'days').format('x')

    let payload = {
      type: 'next',
      range: 'set',
      from: from,
      to: to,
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(7, 'days').format('x'),
        to: +moment().startOf('day').format('x'),
      },
    })
  })
  // it should have range to now, if next is setting the range later than today
  it('should have range to now, if next is setting the range later than today', () => {
    const from = +moment().startOf('day').subtract(8, 'days').format('x')
    const to = +moment().startOf('day').subtract(1, 'days').format('x')

    let payload = {
      type: 'next',
      range: 'set',
      from: from,
      to: to,
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(7, 'days').format('x'),
        to: +moment().startOf('day').format('x'),
      },
    })
  })
  // it should work if only one from or to is passed in
  it('should work if only one from or to is passed in', () => {
    const from = +moment().startOf('day').subtract(8, 'days').format('x')
    const to = +moment().startOf('day').subtract(1, 'days').format('x')

    let payload = {
      type: 'next',
      range: 'set',
      from: from,
      to: '',
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(7, 'days').format('x'),
        to: +moment().startOf('day').format('x'),
      },
    })

    payload = {
      type: 'next',
      range: 'set',
      from: '',
      to: to,
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(7, 'days').format('x'),
        to: +moment().startOf('day').format('x'),
      },
    })
  })

  //it should create correct action when previous type is being apssed in payload
  it('create correct action when previous type is being passed in payload', () => {
    const from = +moment().startOf('day').subtract(14, 'days').format('x')
    const to = +moment().startOf('day').subtract(7, 'days').format('x')

    let payload = {
      type: 'previous',
      range: 'set',
      from: from,
      to: to,
    }

    expect(setRange(payload)).toEqual({
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: +moment().startOf('day').subtract(21, 'days').format('x'),
        to: +moment().startOf('day').subtract(14, 'days').format('x'),
      },
    })
  })

  // it should create FSA action type
  it('should create FSA action', () => {
    const from = +moment().startOf('day').subtract(14, 'days').format('x')
    const to = +moment().startOf('day').subtract(7, 'days').format('x')

    const payload = {
      type: 'previous',
      range: 'set',
      from: from,
      to: to,
    }

    expect(isFSA(setRange(payload))).toBe(true)
  })

})
