/* @flow */
'use strict'

import m from 'mithril'

import styles from './styles.scss'

const FilterComponent = {
  view(vdom) {
    return m(`.${styles.container}`, [
      m(`.${styles.header}`, vdom.attrs.header),
      m(`.${styles.body}`, vdom.attrs.body),
      m(`.${styles.footer}`, vdom.attrs.footer),
    ])
  },
}

export default FilterComponent
