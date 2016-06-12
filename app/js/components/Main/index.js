'use strict'

import m from 'mithril'
// import style from './style.scss'

const Main = {
  view(vdom) {
    return m('#main-container', m(vdom.attrs.container))
  },
}

export default Main
