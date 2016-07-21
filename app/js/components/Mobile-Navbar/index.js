/* @flow */
'use strict'

import m from 'mithril'
import styles from './mobile-navbar-styles.scss'

import map from 'lodash/map'

import {
  setMobileNavbarOpenState
} from '../../actions/'

const MobileNavbar = {
  view (vnode: Object): Object {
    return m(`.${styles.container}`,
      {
        class: vnode.attrs.isOpen ? `${styles.open}` : '',
        onclick: () => vnode.attrs.store.dispatch(setMobileNavbarOpenState(false))
      },
      m(`ul.${styles['nav-container']}`,
        {
          class: vnode.attrs.isOpen ? `${styles.open}` : ''
        },
        [
          m(`li.${styles['header-row']}`,
            m('ul',
              [
                m('li', m('span', 'D')),
                m('li', m('span', vnode.attrs.routeName[vnode.attrs.route]))
              ]
            ),
          ),
          map(vnode.attrs.icons, (icon, index) => {
            const keys = Object.keys(vnode.attrs.routeName)
            return m('li',
              {
                onclick: vnode.attrs.onclick(keys[index])
              },
              m(`ul.${styles.row}`,
                [
                  m(`li.${styles.icon}`, icon),
                  m(`li.${styles.text}`, vnode.attrs.routeName[keys[index]]),
                  m(`.${styles.span}`)
                ]
              )
            )
          })
        ]
      ))
  }
}

export default MobileNavbar
