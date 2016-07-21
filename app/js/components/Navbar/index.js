/* @flow */
'use strict'

import m from 'mithril'
import style from './style.scss'

const Navbar = {
  view (vnode: Object): Object {
    return m(`.${style.navbar}`, [
      m(`ul.${style.navbar__ul}`, [
        m(`li.${style.navbar__li}`, m('span', 'D')),
        vnode.attrs.icons.map((icon, index) => m(`li.${style.navbar__li}`, {
          onclick: () => m.route.setPath(`/dashboard/${vnode.attrs.routes[index]}`)
        }, icon))
      ])
    ])
  }
}

export default Navbar
