/* @flow */
'use strict'

import m from 'mithril'

const Toolbar = {
  view (vnode) {
    return m('', { class: vnode.attrs.className },
      [
        vnode.attrs.isMobile ? vnode.attrs.navbarButton : null,
        m('h1', { key: 'h1' }, vnode.attrs.heading),
        vnode.children
      ]
    )
  }
}

export default Toolbar
