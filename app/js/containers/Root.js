'use strict'

import { configureStore } from '../store'
const store = configureStore()

// import 'normalize-css'
// import style from './style.scss'

import m from 'mithril'
import Toolbar from './Toolbar'
import Navbar from './Navbar'
import Main from './Main'

const Root = {
  view(vnode) {
    return m('#root', [
      m(Toolbar),
      m(Navbar),
      m(Main, { ...vnode.attrs, store }),
      // m(Main, { ...vnode.attrs }),
    ])
  },
}

export default Root
