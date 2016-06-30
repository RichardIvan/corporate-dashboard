'use strict'

import m from 'mithril'

// import TableContainer from '../../containers/Root/Main/Data/Table'
// import { setFormFocus } from '../../actions'
import styles from './styles.scss'

const Data = {
  view(vnode) {
    return m(`#data.${styles['data-container']}`, [
      // m('', 'hi!'),
      m(vnode.attrs.table, { ...vnode.attrs }),
    ])
  },
}

export default Data
