'use strict'

import m from 'mithril'

import styles from './style.scss'

const Graph = {
  view(vnode) {
    return m('#graph', m(`.${styles.container}`, [
      m(`.${styles.textData}`, [ vnode.children ]),
      m(`.${styles.charts}`)
    ]))
  },
}

export default Graph
