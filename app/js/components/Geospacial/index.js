'use strict'

import m from 'mithril'

import {
  setActiveLocation
} from '../../actions/location-list'

import Map from '../../containers/Map'
import LocationList from '../../containers/LocationList'

import styles from './style.scss'

const Geospacial = {
  view (vnode) {
    return m(`.${styles['geo-container']}`, [
      m(`.${styles.header}`, m('h2', `Total: ${vnode.attrs.openIssuesTotal}`)),
      m(`.${styles['geo-inner-container']}`,
        {
          onmouseover: (e) => {
            if (e.target.id === 'map' || e.target.className.includes('geo-inner-container')) {
              vnode.attrs.store.dispatch(setActiveLocation(false))
            }
          }
        },
        [
          m(Map, { ...vnode.attrs, key: 'map2' }),
          m(LocationList, { ...vnode.attrs })
        ]
      )
    ])
  }
}

export default Geospacial
