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

import m from 'mithril'

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
  DELETED_ISSUE,
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
    case DELETED_ISSUE:
      const issue = action.payload.issue
      const id = issue.id
      const location = issue.location
      const employee = issue.employee_name

      return state.setIn(['data', location, 'issues'], state.getIn(['data', location, 'issues']).delete(id))
                  .setIn(['data', location, 'employees'], state.getIn(['data', location, 'employees']).delete(employee))
      // const nextState = state.set('data', state.get('data').map(location => {
      //   // console.log(location.get('locations').toJS())
      //
      //   
      //   console.log(id)
      //   let newIssue = location
      //   if (location.has('issues')) {
      //     const locationIssues = location.get('issues')
      //     if (locationIssues.has(id)) {
      //       console.log('was true')
      //       newIssue = location.set('issues', location.get('issues').delete(id))
      //     }
      //   }
      //   return newIssue
      // }))
      // console.log(nextState.toJS())
      // return nextState
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
