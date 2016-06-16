'use strict'

import m from 'mithril'
import DataComponent from '../components/Data'

import TableContainer from './Table'
// import PaginationContainer from './Pagination'

const Data = {
  view(vdom) {
    // return m('.hey')
    return m(DataComponent, {
      ...vdom.attrs,
      table: TableContainer,
      // m(PaginationContainer)
    })
  },
}

export default Data
