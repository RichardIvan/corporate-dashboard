'use strict'

import m from 'mithril'
import DataComponent from '../../../../components/Data'

import TableContainer from './Table'
// import PaginationContainer from './Pagination'

const Data = {
  view() {
    return m(DataComponent, {
      table: m(TableContainer),
      // m(PaginationContainer)
    })
  },
}

export default Data
