import m from 'mithril'
import Root from './Root'

export function mountRoot (el, attrs) {
  const mount = (Component) => m.mount(el, Component, { ...attrs })

  // if (module.hot) {
  //   console.log('module is hot')
  //   module.hot.accept('./Root', () => {
  //     mount(require('./Root').default)
  //   })
  // }

  mount(Root)
}

export function mountRoute (el) {
  const mount = (Component) => m.route(el, '/dashboard/geo', { '/dashboard/:route': Component })

  mount(Root)
}
