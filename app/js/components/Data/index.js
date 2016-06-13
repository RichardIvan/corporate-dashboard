'use strict'

import m from 'mithril'

// import TableContainer from '../../containers/Root/Main/Data/Table'
// import Pagination from '../../containers/Root/Main/Data/Pagination'

const Data = {
  view(vdom) {
    return m('#data', [
      m(vdom.attrs.table),
    ])
  },
}

export default Data
