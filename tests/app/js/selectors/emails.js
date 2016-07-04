/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List, fromJS } from 'immutable'

import { EMAIL_TYPE } from '../../../../app/js/actions/types'
import { getAllEmails } from '../../../../app/js/selectors'

describe('Emails Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        [EMAIL_TYPE]: List.of(
          List.of(1, 'me@.com'),
          List.of(1, 'you@.com'),
          List.of(1, 'me@.com'),
          List.of(1, 'you@.com')
        ),
      },
    }
  })

  it('should retrieve an List', () => {

    const out = getAllEmails(state)

    expect(List.isList(out)).toBe(true)
  })

  it('should include only unique emails', () => {

    const out = getAllEmails(state)

    expect(out).toEqual(fromJS(['me@.com', 'you@.com']))
  })
})
