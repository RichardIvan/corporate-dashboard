/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List } from 'immutable'

import { EMAIL_TYPE } from '../../../../app/js/actions/types'
import { getAllEmails } from '../../../../app/js/selectors'

describe('Emails Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        [EMAIL_TYPE]: List.of('me@.com', 'you@.com', 'me@.com', 'you@.com'),
      },
    }
  })

  it('should retrieve an array', () => {

    const out = getAllEmails(state)

    expect(Array.isArray(out)).toBe(true)
  })

  it('should include only unique emails', () => {

    const out = getAllEmails(state)

    expect(out).toEqual(['me@.com', 'you@.com'])
  })
})
