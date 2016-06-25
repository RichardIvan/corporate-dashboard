/* @flow */
'use strict'

import m from 'mithril'
import styles from './styles.scss'

const CellComponent = {
  view(vdom: Object): Object {
    return m(`.${styles['cell-container']}`, [
      vdom.attrs.fullTextVisible ? m(`.${styles.tooltip}`, m('p', vdom.attrs.fullText)) : '',
      m('p', {
        onmouseover: vdom.attrs.onmouseover,
        onmouseleave: vdom.attrs.onmouseleave,
      }, [
        vdom.attrs.shortText,
      ]),

    ])
  },
}

export default CellComponent
