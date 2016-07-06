/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import RangeSelectionComponent from '../../../../app/js/components/RangeSelectionWidget'
import RangeSelectionContainer from '../../../../app/js/containers/GraphRangeSelectionWidget'

describe('Range Selection Widget Component', () => {
  // it should have two inputs
  it('should have two datetype inputs', () => {
    const out = mq(RangeSelectionComponent)

    expect(out.should.have.at.least(2, 'input[type=date]')).toBe()
    expect(out.should.have('#rangeFrom')).toBe()
    expect(out.should.have('#rangeTo')).toBe()
  })

  // it should have two labels for the date inputs
  it('should have two labels for the date inputs', () => {
    const out = mq(RangeSelectionComponent)

    expect(out.should.have.at.least(2, 'label')).toBe()
    expect(out.should.contain('from')).toBe()
    expect(out.should.contain('to')).toBe()
  })

  // it should have two buttons
  it('should have two buttons', () => {
    const out = mq(RangeSelectionComponent)

    expect(out.should.have.at.least(2, 'button')).toBe()
  })

  // ti should have a button containinng all
  // this buttoon should have a onclick event
  // set event is setRange({ range: 'all' })
  it.only('should have a button containinng all this buttoon should have a onclick event', () => {
    const out = mq(RangeSelectionComponent, {
      allButtonAttrs: {
        onclick: () => console.log('OK'),
      },
    })

    expect(out.should.contain('All')).toBe()
    expect(out.should.have('.all-button')).toBe()
    out.click('.all-button')
  })

  // it should have a button containing set range
  // it should have a onlick event
  // onclick event should setRange({ range: 'set', 'from': 123, to: '1234' })
  // click on this button should set the prefilled range
  it('should have a button containing set range', () => {
    const out = mq(RangeSelectionComponent, {
      rangeButtonAttrs: {
        onclick: () => console.log('OK'),
      },
    })

    expect(out.should.contain('Set Range')).toBe()
    expect(out.should.have('.range-button')).toBe()
    out.click('.range-button')
  })

  // the prefilled parent component state is set

  // it should have a date type input
  // this input should have a onchange event
  // it.only('should have a date type input with onchange event handler', () => {
  //   const out = mq(RangeSelectionComponent, {
  //     fromDateHandler: () => console.log('OK'),
  //   })
  //
  //   out.change('#rangeFrom')
  //   expect(out.should.have('#rangeFrom'))
  // })

  // the date inputs should be disablet if the all button is selected

  // the date input until should have a date of now prefilled
  // the date input fro should have a a date seven day from now prefileled

  // the component should have two side buttons
  // they should have onclick handlers
  // they should be setting range, passing type of 'next/previous',
  // with usual payload, actionCreator will be doing the calculation to change
  // the range
})
