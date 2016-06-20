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

// import 'normalize-css'
import './global-style.scss'
import '../../fonts/Roboto-Regular.ttf'

import m from 'mithril'

import Toolbar from './Toolbar'
import Navbar from './Navbar'
import Main from './Main'

import styles from '../components/styles.scss'

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
