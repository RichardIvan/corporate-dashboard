/* @flow */
'use strict'

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

// #TODO implement location names reducer
// #TODO implement employees names reudcer
// #TODO change open issues reducer (new version includes the List of IDs)

import { createReducer } from 'rereduce'
import forEach from 'lodash/forEach'

import {
  Map,
  fromJS
} from 'immutable'
import openIssues from '../rereduce-open-issues'
import locations from '../../../data/geojson/markers.json'
// import employees from '../rereduce-employeen-names'

import {
  INIT_LOAD,
  PUSH_DATA,
  SET_ACTIVE_LOCATION
} from '../../actions'

export const setInitialState = () => {
  let state = Map({
    data: Map(),
    active: false
  })
  forEach(locations, (plc) => {
    let place = fromJS(plc)
    place = place.set('issues', Map())
    place = place.set('employees', Map())
    state = state.setIn(['data', place.get('name')], place)

    // state = state.setIn(['data', place.name, 'issues'])
                  // .setIn(['data', place.name, 'employees'])
                  // .set(place.name, place)
  })
  // locations.map((place) => {
  //   state = state.set(place.name, place)
  // })
  return state
}

const initialState = setInitialState()

export function locationListReducer (state: Map, action: Object, openIssues: Map): Map {
  switch (action.type) {
    case INIT_LOAD: {
      let nextState = state
      openIssues.get('issues').forEach((issue) => {
        const location = issue.getIn(['location', 'original'])
        const employee = issue.getIn(['employee_name', 'original'])
        const id = issue.getIn(['id', 'original'])
        nextState = nextState.setIn(['data', location, 'issues', id])
                          .setIn(['data', location, 'employees', employee])
      })
      const sorted = nextState.get('data').sortBy(issue => {
        return issue.get('issues').count()
      })
      return nextState.set('data', sorted)
    }
    case PUSH_DATA: {
      let newState = state
      const issues = action.payload.data
      forEach(issues, (issue) => {
        const status = issue.open_status.original
        if (status === true || status === 'true') {
          const location = issue.location.original
          const employee = issue.employee_name.original
          const id = issue.id.original

          newState = newState.setIn(['data', location, 'issues', id])
                          .setIn(['data', location, 'employees', employee])
        }
      })
      const sorted = newState.get('data').sortBy(issue => {
        return issue.get('issues').count()
      })
      return newState.set('data', sorted)
    }
    case SET_ACTIVE_LOCATION:
      return state.set('active', action.payload.value)
    default:
      return state
  }
}

const LLR = createReducer({ openIssues },
  (state = initialState, action, { openIssues }) => {
    // make it testable
    return locationListReducer(state, action, openIssues)
  }
)

export default LLR
