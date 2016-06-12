/* @flow */

// this is a smart component

// import m from 'mithril'
import m from 'mithril/render/hyperscript'
// import classNames from 'classnames'
import ToolbarComponent from '../components/Toolbar'
// import {getMessages} from '../selectors'
// import {clearMessage} from '../actions'
// import styles from './style.scss'

const Toolbar = {
  view() {
    // const state = store.getState();
    // console.log(vnode)
    return m('h1')

    // return (
    //   <ToolbarComponent className={classNames(styles.messages, className)}
    //     messages={getMessages(state)}
    //     onClose={ctrl.handleClose}
    //   />
    // )
  },
}

export default Toolbar
