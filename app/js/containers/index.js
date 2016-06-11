import m from 'mithril'
import Root from './Root'

import './style.scss'
import '../../fonts/Roboto-Regular.ttf'

export function mountRoot(el, attrs) {
  const mount = (Component) => m.mount(el, Component, { ...attrs })

  if (module.hot) {
    console.log('module is hot')
    module.hot.accept('./Root', () => {
      mount(require('./Root').default);
    });
  }

  mount(Root)
}
