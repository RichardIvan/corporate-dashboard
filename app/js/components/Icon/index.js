/* @flow */
'use strict'

import m from 'mithril'
import styles from './styles.scss'

const Icon = {
  view(vdom) {
    return m('', { class: styles[vdom.attrs.className] }, vdom.attrs.icon)
  },
}

export default Icon
