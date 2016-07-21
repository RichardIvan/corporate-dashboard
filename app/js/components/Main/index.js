'use strict'

import m from 'mithril'

// TODO remove this toolbar from the presentational component and pass it down from  container
import ToolbarContainer from '../../containers/Toolbar-inner'
import styles from './style.scss'

import {
  isMobile
} from '../../selectors'

const Main = {
  view (vnode) {
    return m(`#main-container.${styles.main}`, [
      !isMobile(vnode.attrs.store.getState())
        ? m(ToolbarContainer, { ...vnode.attrs })
        : null,
      m(vnode.attrs.container, { ...vnode.attrs }),
      vnode.children
    ])
  }
}

export default Main
