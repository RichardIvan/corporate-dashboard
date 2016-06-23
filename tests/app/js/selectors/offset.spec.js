'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { getOffset } from '../../../../app/js/selectors'

describe('Offset Selector', () => {
  it('should return offset from the sotre', () => {
    let state = {
      offset: 0,
    }

    expect(getOffset(state)).toBe(0)

    state = {
      offset: 21,
    }

    expect(getOffset(state)).toBe(21)
  })
})
