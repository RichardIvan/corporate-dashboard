'use strict'

import { configureStore } from '../store'
import { connectToSocket } from '../helpers'
// this configure store function takes in initial state
// we can store this persistent state in indexdb and reload it on next app
// initialtion

// we can have a function getting that initial sate
// use dixie for that

// we can be using this setting up in the store file
const store = configureStore()
connectToSocket(store)

import { setWindowSizeListener } from '../services/mobile-state'

const startWindowSizeListener = setWindowSizeListener(store)
startWindowSizeListener()

// import 'normalize-css'
import './global-style.scss'
import '../../fonts/Roboto-Regular.ttf'

import m from 'mithril'

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
