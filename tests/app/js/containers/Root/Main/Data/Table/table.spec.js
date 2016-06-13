import o from '../../../../../../../../ospec/ospec.js'
import mq from 'mithril-query'

import TableContainer from './../../../../../../../../app/js/containers/Root/Main/Data/Table'

o.spec('table container', () => {
  o.only('should have at least one UL', () => {
    o(mq(TableContainer).should.have.at.least(1, 'ul')).equals()
  })

  o('should have 10 ul', () => {
    o(mq(TableContainer).should.have.at.least(10, 'ul')).equals(true)
  })
  o('should have 70 li', () => {
    o(mq(TableContainer).should.have.at.least(70, 'ul')).equals(true)
  })


})
