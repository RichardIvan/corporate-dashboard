// this is just a presentational component

import m from 'mithril'
// import style from './style.scss'

const Toolbar = {
  view(vnode) {
    return m('', { class: vnode.attrs.className },
      [
        m('h1', vnode.attrs.heading),
        vnode.attrs.children,
      ]
    )
  },
}

export default Toolbar
