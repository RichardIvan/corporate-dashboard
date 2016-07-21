/* @flow */

// this is a smart component

import m from 'mithril'
// import classNames from 'classnames'
import ToolbarComponent from '../components/Toolbar'
import { resolveHeading } from '../helpers'
// import {getMessages} from '../selectors'
// import {clearMessage} from '../actions'
// import styles from './style.scss'

import icon from '../../icons/google/msvg/navigation/menu'
import {
  setMobileNavbarOpenState
} from '../actions'
import {
  isMobile
} from '../selectors'

import styles from '../components/Toolbar/styles.scss'

const Toolbar = {
  view (vnode: Object): Object {
    // const state = store.getState();
    return m(ToolbarComponent,
      {
        ...vnode.attrs,
        isMobile: isMobile(vnode.attrs.store.getState()),
        heading: resolveHeading('root', vnode.attrs.route),
        className: `${styles.root}`,
        navbarButton: m(`.${styles.navBarbutton}`,
          {
            onclick: () => vnode.attrs.store.dispatch(setMobileNavbarOpenState(true)),
            key: 'button'
          }, icon)
      })
  }
}

export default Toolbar
