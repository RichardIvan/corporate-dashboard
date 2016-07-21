/* @flow */
'use strict'

import m from 'mithril'
import map from 'lodash/map'

import {
  setActiveLocation
} from '../../actions/location-list'

import {
  getActiveLocation
} from '../../selectors/location-list'

// should have ul

// should have header column
  // should display
    // Location
    // Open issues
    // Active employees
// should have items by location name
  // should display
    // name
    // should display number of open issues at that Location
    // should display number of assigned employees at that location
// ROW
// should change class on hover
// should change active map tile on hover
  // should check currently acttive map tile before setting it

// shoould get active tile map on redraw
  // is reselect selector
    // called is tile active - returns key of the currently active location
      // this is being check agains the type of the tile
    // is setting class based on if the passed in thing
    // is dependent on
// should set inactive tile on whole location list blur

// reducer
  // should be a map of locations keys
    // should have
      // open issuees entry
        // should be a list of unique ids of open issues at that location
      // employees entry
        // should be a list of unique names at that location
      // position entry
        // this is position the tooltip should display itself at
  // is dependent on
    // open issues
    // list/map of locations
    // employee names
  // responds to
    // init load


// active tile reducer
  // is dependent on location list reducer
  // should store
    // all info grabbed from location list map whatever reducer
  // should respond to
    // actieve_map_tile
      // this is setting active tilime map thingy
      // is pullign data from
        // dependor location list items
  // should be reset on map container blur
  // should be reset on list container blur

// map tooltip
   // is simply a selector, is selecting item from active tile reducer
   // has
     // position
     // active tile info
       // number of open issues
       // number of employees at a locations
       // name of the location
// ------ OLD ------- //
  // has selector
    // is reselect
      // is dependent
        // locatoins reducer
          // to get
            // info under the name key
        // active tile <--
          // stores name of active location
            // this name is being
// ------ OLD ------- //

import style from './location-list-style.scss'

const LocationListComponent = {
  view (vnode: Object): Object {
    // return m('', 'YES')
    return m(`.${style['component-container']}`, [
      m(`ul.${style.list}`, [
        m('li', m(`ul.${style['header-row']}`, vnode.attrs.header.attrs, [
          map(vnode.attrs.header.text, (text) =>
            m('li', text)
          )
        ])),
        vnode.attrs.children.items.map(item =>
          m('li', {
            onmouseover: () => vnode.attrs.store.dispatch(setActiveLocation(item[0])),
            class:
              getActiveLocation(vnode.attrs.store.getState())
              ? getActiveLocation(vnode.attrs.store.getState()).get('name') === item[0] ? 'selected' : '' : ''
          }, m(`ul.${style.row}`, vnode.attrs.children.attrs, [
            item.map(text => m('li', text))
          ]))
        )
      ])
    ])
  }
}

export default LocationListComponent
