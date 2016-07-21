/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import LocationListComponent from '../../../../app/js/components/Location-List/'

describe('Location List Component', () => {
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

  // should change class on hover
    // this is done by coparing it's location type name to a key of active location

  // should change active map tile on hover -- <- ACTION CREATOR
    // should check currently acttive map tile before setting it

  // should set inactive tile on whole location list blur
})
