'use strict'

import m from 'mithril'
import DataComponent from '../components/Data'

import TableContainer from './Table'
// import PaginationContainer from './Pagination'

const Data = {
  view(vnode) {
    // return m('.hey')
    return m(DataComponent, {
      ...vnode.attrs,
      table: TableContainer,
    })
  },
}

export default Data
