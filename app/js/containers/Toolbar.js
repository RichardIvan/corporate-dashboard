/* @flow */

// this is a smart component

import m from 'mithril'
// import classNames from 'classnames'
import ToolbarComponent from '../components/Toolbar'
import { resolveHeading } from '../helpers'
// import {getMessages} from '../selectors'
// import {clearMessage} from '../actions'
// import styles from './style.scss'
import styles from '../components/Toolbar/styles.scss'

const Toolbar = {
  view(vnode: Object): Object {
    // const state = store.getState();
    return m(ToolbarComponent,
      {
        heading: resolveHeading('root', vnode.attrs.route),
        className: `${styles.root}`,
      })

    // return (
    //   <ToolbarComponent className={classNames(styles.messages, className)}
    //     messages={getMessages(state)}
    //     onClose={ctrl.handleClose}
    //   />
    // )
  },
}

export default Toolbar
