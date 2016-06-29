/* @flow */
'use strict'

import m from 'mithril'
import ToolbarComponent from '../components/Toolbar'

import { resolveHeading, renderChildren } from '../helpers'
import styles from '../components/Toolbar/styles.scss'

const Toolbar = {
  view(vnode: Object): Object {
    return m(ToolbarComponent,
      {
        heading: resolveHeading('main', vnode.attrs.route),
        className: `${styles[vnode.attrs.route]}`,
      },
      [
        renderChildren(vnode.attrs),
      ])
  },
}

export default Toolbar
