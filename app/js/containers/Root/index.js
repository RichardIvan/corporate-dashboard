'use strict'

import { configureStore } from '../../store'
const store = configureStore()

// import 'normalize-css'
import '../global-style.scss'
import '../../../fonts/Roboto-Regular.ttf'

import m from 'mithril'

import Toolbar from './Toolbar'
import Navbar from './Navbar'
import Main from './Main'

import styles from '../../components/styles.scss'

const Root = {
  view(vnode) {
    return m(`#root.${styles.root}`, [
      m(`.${styles.rootSidebar}`,
        m(Navbar)
      ),
      m(`.${styles.rootMain}`, [
        m(Toolbar, { ...vnode.attrs }),
        m(Main, { ...vnode.attrs, store }),
      ]),

      // m(Main, { ...vnode.attrs }),
    ])
  },
}

export default Root
