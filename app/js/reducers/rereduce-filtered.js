/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, List } from 'immutable'

import issuesReducer from './rereduce-issues'
import filtersReducer from './rereduce-filter'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  LOCATION_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
} from '../actions/types'

const filtered = createReducer({ issuesReducer, filtersReducer },

  (state = List.of(), action, { issuesReducer, filtersReducer }): List => {
  // console.log(issuesReducer)
  // console.log(filtersReducer)

  // const activeFilters = filtersReducer.filter((filter) => {
  //   // console.log(filter.get('active'))
  //   return filter.get('active')
  // })

  const activeFilters = Map({
    [NAME_TYPE]:  Map({
      type: NAME_TYPE,
      active: true,
      by: List.of('a'),
    }),
  })

  if (activeFilters.isEmpty()) {
    return issuesReducer.reduce((acc, issue) => acc.push(issue), List.of())
  }

  console.log('not empty')
  const filteredItems = issuesReducer.reduce((acc, issue) => {
    const listOfFilterResults = activeFilters.reduce((status, filter) => {
      const type = filter.get('type')

      switch (type) {
      case NAME_TYPE:
      case EMAIL_TYPE:
      case LOCATION_TYPE:
      case EMPLOYEE_TYPE: {
        // console.log(`type is ${type}`)
        const issueProp = issue.getIn([type, 'original']).toLowerCase()
        const filterBy = filter.get('by')

        let newStatus = filterBy.map((value) => {
          return issueProp.indexOf(value.toLowerCase()) !== -1
        })

        // console.log('does it have true?')
        // newStatus.forEach(item => console.log(item))
        // console.log(newStatus.has(true))

        newStatus = newStatus.includes(true)
        // console.log(issue.getIn([filter.get('type'), 'original']))
        // item[1].toLocaleLowerCase().startsWith(filterByItem.toLocaleLowerCase())
        // console.log(filter.get('by').has(issueProp))
        // console.log(filter.get('by'))
        return status.push(newStatus)
      }
      case OPEN_STATUS_TYPE:
        console.log(`type is ${type}`)
        return status.push(issue.get(type) === filter.get('by'))
      default: {
        console.log(`type is ${type}`)
        if (type === OPENING_TIMESTAMP_TYPE) {
          const toTimestamp = activeFilters.getIn([CLOSING_TIMESTAMP_TYPE, 'timestamp'])
          const issueProp = issue.getIn([type, 'original'])
          return status.push(
            toTimestamp ?
                    issueProp >= filter.get('timestamp') && issueProp <= toTimestamp :
                    issueProp >= filter.get('timestamp')
          )
        } else {
          const fromTimestamp = activeFilters.getIn([OPENING_TIMESTAMP_TYPE, 'timestamp'])
          const issueProp = issue.getIn([type, 'original'])
          return status.push(
            fromTimestamp ?
                    issueProp <= filter.get('timestamp') && issueProp >= fromTimestamp :
                    issueProp <= filter.get('timestamp')
          )
        }
      }

      }
      // let newStatus = false
    }, List.of())

    // console.log('list of filtered results')
    // console.log(listOfFilterResults.includes(false))
    return !listOfFilterResults.includes(false) ? acc.push(issue) : acc
  }, List.of())


  // console.log(filteredItems.count())
  // console.log(filteredItems.includes(false))
  // if the item has false it doesn't pass all the filters
  // so it should not be included
  return filteredItems
  // return issuesReducer
})

export default filtered
