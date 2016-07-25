'use strict'

import { configureStore } from '../store'
import { connectToSocket } from '../helpers'

import { setWindowSizeListener } from '../services/mobile-state'

// import 'normalize-css'
import './global-style.scss'
import '../../fonts/Roboto-Regular.ttf'

import m from 'mithril'

const store = configureStore()
connectToSocket(store)
store.subscribe(m.redraw)

const startWindowSizeListener = setWindowSizeListener(store)
startWindowSizeListener()

import {
  isMobile
} from '../selectors'

import Navbar from './Navbar'
import MobileNavbar from './Mobile-Navbar'

import Toolbar from './Toolbar'
import Main from './Main'

import styles from '../components/styles.scss'

const Root = {
  view (vnode) {
    return m(`#root.${styles.root}`, [
      isMobile(store.getState())
        ? m(`.${styles.rootMobileSidebar}`,
          m(MobileNavbar, { ...vnode.attrs, store })
        )
        : m(`.${styles.rootSidebar}`,
          m(Navbar)
        ),
      m(`.${styles.rootMain}`, [
        m(Toolbar, { ...vnode.attrs, store }),
        m(Main, { ...vnode.attrs, store })
      ])
      // m(Main, { ...vnode.attrs }),
    ])
  }
}

export default Root
