/* @flow */
'use strict'

import m from 'mithril'

import styles from './styles.scss'

const FilterBodyComponent = {
  view(vnode) {
    return m(`.${styles.container}`, vnode.attrs.body)
  },
}

export default FilterBodyComponent
