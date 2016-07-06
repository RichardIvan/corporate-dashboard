/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'
import OpenIssuesComponent from '../../../../app/js/components/OpenIssues'

describe('Open Issues Display', () => {

  // display/receive a number
  it('should display a number in a p tag', () => {
    const out = mq(OpenIssuesComponent, {
      total: 37,
    })

    expect(out.should.have('p')).toEqual()
    expect(out.should.contain('37')).toBe()
  })
})
