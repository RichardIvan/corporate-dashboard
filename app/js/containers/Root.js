import m from 'mithril'
import Toolbar from './Toolbar'
import Navbar from './Navbar'
// import Main from './Main'

const Root = {
  view(vnode: Object): Object {
    return m('div', [
      m(Toolbar, { ...vnode.attrs }),
      m(Navbar, { ...vnode.attrs }),
      // m(Main, { ...vnode.attrs }),
    ])
  },
}

export default Root
