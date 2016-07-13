 /* @flow */
'use strict'

import moment from 'moment'
import reduce from 'lodash/reduce'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'
import {
  INIT_LOAD,
  PUSH_DATA,
} from '../actions'

import {
  addOpenIssuesData,
  fillIssues,
} from './graph-data/helpers'


const graphData = createReducer((state = new Map({ data: new Map() }), action) => {
  switch (action.type) {
  case INIT_LOAD: {
    // console.log(action.payload)
    const newState = state.set('data', fromJS(action.payload.payingCustomersData))
    const transformedState = addOpenIssuesData(newState, action.payload.data)
    console.log(transformedState.toJS())
    return transformedState
  }
  case PUSH_DATA: {
    let newState = state
    const requiredData = ['payingCustomersData', 'openIssuesData']
    const path = ['data']
    path.concat(moment().format('YY/MM/DD').split('/'))

    requiredData.forEach((type) => {
      if (type === 'payingCustomersData') {
        return newState
        const newValue = fromJS(action.payload.payingCustomersData).getIn(path.splice(1))
        const currentVal = state.getIn(path.concat(type)) + newValue
        newState = currentVal < 0 ?
                      newState.setIn(path, 0) :
                      newState.setIn(path, currentVal)
      }
      else if (type === 'openIssuesData') {
        newState = reduce(action.payload.data, (acc, issue) => {
          return fillIssues(acc, issue)
        }, newState)
      }
    })

    return newState
  }
  default:
    return state
  }
})

export default graphData
