/* @flow */
'use strict'

import m from 'mithril'
import styles from './styles.scss'

const CellComponent = {
  view (vnode: Object): Object {
    return m(`.${styles['cell-container']}`, [
      vnode.attrs.fullTextVisible ? m(`.${styles.tooltip}`, m('p', vnode.attrs.fullText)) : '',
      m('p',
        vnode.attrs.cellEventHandlers,
        [
          vnode.attrs.shortText
        ])
    ])
  }
}

export default CellComponent
