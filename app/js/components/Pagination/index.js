/* @flow */
'use strict'

import m from 'mithril'

import styles from './pagination-styles.scss'

const PaginationComponent = {
  view(vnode) {
    return m(`.${styles.container}`, [
      vnode.attrs.previousButton,
      vnode.attrs.paginationDisplay,
      vnode.attrs.nextButton,
    ])
  },
}

export default PaginationComponent
