'use strict'

import m from 'mithril'
import ToolbarContainer from '../../containers/Root/Main/Toolbar'
import styles from './style.scss'

const Main = {
  view(vdom) {
    return m(`#main-container.${styles.main}`, [
      m(ToolbarContainer, { ...vdom.attrs }),
      m(vdom.attrs.container, { ...vdom.attrs }),
    ])
  },
}

export default Main
