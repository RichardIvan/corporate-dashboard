/* @flow */
'use strict'

import m from 'mithril'
import style from './style.scss'

const Navbar = {
  view(vnode) {
    // console.log(vnode)
    return m(`.${style.navbar}`, [
      m('ul', [
        m('li', 'D'),
        vnode.attrs.icons.map((icon) => m('li', icon)),
      ]),
    ])
  },
}

export default Navbar
