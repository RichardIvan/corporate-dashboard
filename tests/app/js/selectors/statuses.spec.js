/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List } from 'immutable'

import { OPEN_STATUS_TYPE } from '../../../../app/js/actions/types'
import { getAllStatuses } from '../../../../app/js/selectors'

describe('Statuses Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        [OPEN_STATUS_TYPE]: List.of(
          List.of(1, true),
          List.of(1, false),
          List.of(1, true),
          List.of(1, true)
        ),
      },
    }
  })

  it('should retrieve an array', () => {

    const out = getAllStatuses(state)

    expect(Array.isArray(out)).toBe(true)
  })

  it('should include only unique statuses', () => {

    const out = getAllStatuses(state)

    expect(out).toEqual([true, false])
  })
})
