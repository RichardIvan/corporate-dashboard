// this is just a presentational component

import m from 'mithril'
// import style from './style.scss'

const Toolbar = {
  view(vnode) {
    return m('h1', vnode.attrs.heading)
  },
}

export default Toolbar
