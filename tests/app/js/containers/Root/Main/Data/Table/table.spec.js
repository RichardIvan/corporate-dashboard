// import o from '../../../../../../../../ospec/ospec.js'
import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import TableContainer from './../../../../../../../../app/js/containers/Root/Main/Data/Table'

describe('Table container', () => {
  it('should have at least one UL', () => {
    expect(mq(TableContainer).should.have.at.least(1, 'ul')).toBe()
  })
  it('should have at least 8 UL', () => {
    expect(mq(TableContainer).should.have.at.least(8, 'ul')).toBe()
  })
  it('should have at least 70 li', () => {
    expect(mq(TableContainer).should.have.at.least(70, 'li')).toBe()
  })
})

// o.spec('table container', () => {
//   o('should have at least one UL', () => {
//     o(mq(TableContainer).should.have.at.least(1, 'ul')).equals()
//   })
//
//   o('should have 8 ul', () => {
//     o(mq(TableContainer).should.have.at.least(8, 'ul')).equals()
//   })
//   o('should have 70 li', () => {
//     o(mq(TableContainer).should.have.at.least(70, 'li')).equals()
//   })
//
//
// })
