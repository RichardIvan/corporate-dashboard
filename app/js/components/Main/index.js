'use strict'

import m from 'mithril'

// TODO remove this toolbar from the presentational component and pass it down from  container
import ToolbarContainer from '../../containers/Toolbar'
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
