/* @flow */
'use strict'

import m from 'mithril'

import leftArrow from '../../../icons/google/msvg/hardware/keyboard-arrow-left'
import rightArrow from '../../../icons/google/msvg/hardware/keyboard-arrow-right'

import styles from './range-selection-widget-styles.scss'

const RangeSelectionWidgetComponent = {
  view(vnode) {
    return m(`.${styles.container}`,
      m(`.${styles['inner-container']}`,
        [
          m(`button.${styles.previous}`,
            vnode.attrs.previousButtonAttrs,
            m('span', leftArrow)
          ),
          m(`.${styles.mainInputs}`,
            [
              m(`.${styles.dates}`,
                vnode.attrs.dateAttrs,
                [
                  m(`.${styles.fromContainer}`,
                    [
                      m('label[for=rangeFrom]', 'from'),
                      m('input[type=date][id=rangeFrom]',
                        vnode.attrs.fromInputAttrs,
                      ),
                    ]
                  ),
                  m(`.${styles.toContainer}`,
                    [
                      m('label[for=rangeTo]', 'to'),
                      m('input[type=date][id=rangeTo]',
                        vnode.attrs.toInputAttrs,
                      ),
                    ]
                  ),
                ]
              ),
              m(`.${styles.rangeButtons}`,
                [
                  m('button.range-button',
                    vnode.attrs.rangeButtonAttrs,
                    'Set Range'),
                  m('button.all-button',
                    vnode.attrs.allButtonAttrs,
                    'All'),
                ]
              ),
            ]
          ),
          m(`button.${styles.next}`,
            vnode.attrs.nextButtonAttrs,
            m('span', rightArrow)
          ),
        ]
      )
    )
  },
}

export default RangeSelectionWidgetComponent
