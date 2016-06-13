'use strict'

import { configureStore } from '../store'
const store = configureStore()

// import 'normalize-css'
import './global-style.scss'
import '../../fonts/Roboto-Regular.ttf'

import m from 'mithril'

import Toolbar from './Toolbar'
import Navbar from './Navbar'
import Main from './Main'

const Root = {
  view(vnode) {
    return m('#root', [
      m(Toolbar, { ...vnode.attrs }),
      m(Navbar),
      m(Main, { ...vnode.attrs, store }),
      // m(Main, { ...vnode.attrs }),
    ])
  },
}

export default Root
