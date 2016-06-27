/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'
import m from 'mithril'

import FilterComponent from '../../../../app/js/components/Filter'

describe('Filter Component', () => {
  const component = mq(FilterComponent, {
    header: m('.header'),
    body: m('.body'),
    footer: m('.footer'),
  })

  it('should display header', () => {
    expect(component.has('.header')).toBe(true)
  })

  it('should display body', () => {
    expect(component.has('.body')).toBe(true)
  })

  it('should display footer', () => {
    expect(component.has('.footer')).toBe(true)
  })
})
