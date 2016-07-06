/* @flow */
'use strict'

import m from 'mithril'

import styles from './range-selection-widget-styles.scss'

const RangeSelectionWidgetComponent = {
  view(vnode) {
    return m(`.${styles.container}`, [
      m(`button${styles.previous}`,
        vnode.attrs.previousButtonAttrs
      ),
      m(`${styles.mainInputs}`, [
        m(`.${styles.dates}`, [
          m('label[for=rangeFrom]', 'from'),
          m('input[type=date][id=rangeFrom]',
            vnode.attrs.fromInputAttrs,
          ),
          m('label[for=rangeTo]', 'to'),
          m('input[type=date][id=rangeTo]',
            vnode.attrs.toInputAttrs,
          ),
        ]),
        m(`.${styles.rangeButtons}`, [
          m('button.range-button',
            vnode.attrs.rangeButtonAttrs,
            'Set Range'),
          m('button.all-button',
            vnode.attrs.allButtonAttrs,
            'All'),
        ]),
      ]),
      m(`button${styles.next}`,
        vnode.attrs.nextButtonAttrs
      ),
    ])
  },
}

export default RangeSelectionWidgetComponent
