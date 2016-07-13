/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, List, fromJS } from 'immutable'

import issuesReducer from './rereduce-issues'
import filtersReducer from './rereduce-filter'

// import { transformNewIssue } from './helpers.js'
// import { generateShortVersions } from '../helpers/generators'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  LOCATION_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
} from '../actions/types'

import {
  PUSH_DATA,
  INIT_LOAD,
  SET_FILTER,
  RESET_FILTERS,
} from '../actions'

const filtered = createReducer({ issuesReducer, filtersReducer },
  (state = List.of(), action, { issuesReducer, filtersReducer }): List => {
    const activeFilters = filtersReducer.filter((filter) => filter.get('active'))
    if (activeFilters.isEmpty()) {
      return issuesReducer.reduce((acc, issue) => acc.push(issue), List.of())
    }

    switch (action.type) {
    case PUSH_DATA: {
      let issue = action.payload.data
      const key = Object.keys(issue)[0]
      issue = fromJS(issue[key])

      const listOfFilterResults = activeFilters.reduce((status, filter) => {
        const type = filter.get('type')

        switch (type) {
        case NAME_TYPE:
        case EMAIL_TYPE:
        case LOCATION_TYPE:
        case EMPLOYEE_TYPE: {
          const issueProp = issue.getIn([type, 'original']).toLowerCase()
          const filterBy = filter.get('by')

          let newStatus = filterBy.map((value) => issueProp.indexOf(value.toLowerCase()) !== -1)

          newStatus = newStatus.includes(true)

          return status.push(newStatus)
        }
        case OPEN_STATUS_TYPE:
          return status.push(issue.getIn([type, 'original']) === filter.get('by'))
        default: {
          if (type === OPENING_TIMESTAMP_TYPE) {
            const toTimestamp = activeFilters.getIn([CLOSING_TIMESTAMP_TYPE, 'timestamp'])
            // TODO it is defined bellow as well => put definition on top
            const issueProp = issue.getIn([type, 'original'])
            if (!issueProp || issueProp === '') {
              return status.push(false)
            }
            return status.push(
              toTimestamp ?
                      issueProp >= filter.get('timestamp') && issueProp <= toTimestamp :
                      issueProp >= filter.get('timestamp')
            )
          }

          const fromTimestamp = activeFilters.getIn([OPENING_TIMESTAMP_TYPE, 'timestamp'])
          const issueProp = issue.getIn([type, 'original'])
          if (!issueProp && issueProp === '') {
            return status.push(false)
          }
          return status.push(
            fromTimestamp && fromTimestamp !== '' ?
                    issueProp <= filter.get('timestamp') && issueProp >= fromTimestamp :
                    issueProp <= filter.get('timestamp')
          )
        }

        }
      }, List.of())

      return !listOfFilterResults.includes(false) ? state.push(fromJS(issue[key])) : state
    }
    case SET_FILTER:
    case RESET_FILTERS:
    case INIT_LOAD: {
      const filteredItems = issuesReducer.reduce((acc, issue: Map) => {
        const listOfFilterResults = activeFilters.reduce((status, filter) => {
          const type = filter.get('type')

          switch (type) {
          case NAME_TYPE:
          case EMAIL_TYPE:
          case LOCATION_TYPE:
          case EMPLOYEE_TYPE: {
            const issueProp = issue.getIn([type, 'original']).toLowerCase()
            const filterBy = filter.get('by')

            let newStatus = filterBy.map((value) => issueProp.indexOf(value.toLowerCase()) !== -1)

            newStatus = newStatus.includes(true)

            return status.push(newStatus)
          }
          case OPEN_STATUS_TYPE:

            return status.push(issue.getIn([type, 'original']) === `${filter.get('by')}`)
          default: {
            // console.log(`type is ${type}`)
            if (type === OPENING_TIMESTAMP_TYPE) {
              const toTimestamp = activeFilters.getIn([CLOSING_TIMESTAMP_TYPE, 'timestamp'])
              const issueProp = issue.getIn([type, 'original'])
              if (!issueProp || issueProp === '') {
                return status.push(false)
              }
              return status.push(
                toTimestamp && toTimestamp !== '' ?
                        issueProp >= filter.get('timestamp') && issueProp <= toTimestamp :
                        issueProp >= filter.get('timestamp')
              )
            }

            const fromTimestamp = activeFilters.getIn([OPENING_TIMESTAMP_TYPE, 'timestamp'])
            const issueProp = issue.getIn([type, 'original'])

            if (!issueProp || issueProp === '') {
              return status.push(false)
            }
            return status.push(
              fromTimestamp && fromTimestamp !== '' ?
                      issueProp <= filter.get('timestamp') && issueProp >= fromTimestamp :
                      issueProp <= filter.get('timestamp')
            )
          }

          }
        }, List.of())

        return !listOfFilterResults.includes(false) ? acc.push(issue) : acc
      }, List.of())
      return filteredItems
    }
    default:
      return state
    }
  }
)

export default filtered
