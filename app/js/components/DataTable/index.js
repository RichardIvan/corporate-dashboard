'use strict'

import m from 'mithril'

const DataTable = {
  view(vdom) {
    console.log(vdom.attrs.issues)
    return m('', [
      vdom.attrs.issues.map((issue) => {
        return m('ul', issue.map((field) => m('li', m('p', field))))
      })
    ])
  },
}

export default DataTable
