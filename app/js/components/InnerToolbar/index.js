/* @flow */
'use strict'

import m from 'mithril'
// import style from './style.scss'

const Toolbar = {
  view (vnode) {
    return m('', { class: vnode.attrs.className },
      [
        m('h1', vnode.attrs.heading),
        vnode.children
      ]
    )
  }
}

export default Toolbar
