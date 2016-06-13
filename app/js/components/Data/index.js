'use strict'

import m from 'mithril'

// import TableContainer from '../../containers/Root/Main/Data/Table'
// import Pagination from '../../containers/Root/Main/Data/Pagination'
// import { setFormFocus } from '../../actions'
import styles from './styles.scss'

const Data = {
  view(vdom) {
    return m(`#data.${styles['data-container']}`, [
      // m('', 'hi!')
      m(vdom.attrs.table, { ...vdom.attrs }),
    ])
  },
}

export default Data
