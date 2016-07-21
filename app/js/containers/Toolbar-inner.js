/* @flow */
'use strict'

import m from 'mithril'
import InniterToolbarComponent from '../components/InnerToolbar'

import { resolveHeading, renderChildren } from '../helpers'
import styles from '../components/Toolbar/styles.scss'

const Toolbar = {
  oninit (vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  onbeforeupdate (vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  view (vnode: Object): Object {
    return m(InniterToolbarComponent,
      {
        heading: resolveHeading('main', vnode.attrs.route),
        className: `${styles[vnode.attrs.route]}`
      },
      [
        renderChildren(vnode.attrs)
      ])
  }
}

export default Toolbar
