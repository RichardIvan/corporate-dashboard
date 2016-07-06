/* @flow */
'use strict'

import m from 'mithril'

import styles from './open-issues-styles.scss'

const OpenIssuesComponent = {
  view(vnode) {
    return m(`.${styles.total}`, m('p', vnode.attrs.total))
  },
}

export default OpenIssuesComponent