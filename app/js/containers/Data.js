'use strict'

import m from 'mithril'
import DataComponent from '../components/Data'

import TableContainer from './Table'
// import PaginationContainer from './Pagination'

const Data = {
  oncreate () {
    const map = document.getElementById('map')
    if (map) {
      map.parentNode.removeChild(map)
    }
  },
  view (vnode) {
    // return m('.hey')
    return m(DataComponent, {
      ...vnode.attrs,
      key: 'data',
      table: TableContainer
    })
  }
}

export default Data
