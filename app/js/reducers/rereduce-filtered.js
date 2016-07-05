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
  NEW_ISSUE,
  INIT_LOAD,
  SET_FILTER,
  RESET_FILTERS,
} from '../actions'

const filtered = createReducer({ issuesReducer, filtersReducer },

  (state = List.of(), action, { issuesReducer, filtersReducer }): List => {

    // const activeFilters = Map({
    //   [NAME_TYPE]:  Map({
    //     type: NAME_TYPE,
    //     active: true,
    //     by: List.of('a'),
    //   }),
    // })

//     console.log(issuesReducer.toJS())

    const activeFilters = filtersReducer.filter((filter) => {
      // console.log(filter.get('active'))
//       console.log(filter.get('active'))
      return filter.get('active')
    })

    if (activeFilters.isEmpty()) {
      return issuesReducer.reduce((acc, issue) => acc.push(issue), List.of())
    }



    switch(action.type) {
    case NEW_ISSUE: {

      // console.log('NEW_ISSUE')

      // const json = transformNewIssue(action.payload.data)
      // // const key = json.id.original
      // const issue = generateShortVersions(json)
      let issue = action.payload.data
      const key = Object.keys(issue)[0]
      issue = fromJS(issue[key])

      const listOfFilterResults = activeFilters.reduce((status, filter) => {
        console.log(filter.toJS())
        const type = filter.get('type')

        switch (type) {
        case NAME_TYPE:
        case EMAIL_TYPE:
        case LOCATION_TYPE:
        case EMPLOYEE_TYPE: {
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
          // console.log(`type is ${type}`)
          return status.push(issue.getIn([type, 'original']) === filter.get('by'))
        default: {
          // console.log(`type is ${type}`)
          if (type === OPENING_TIMESTAMP_TYPE) {
            const toTimestamp = activeFilters.getIn([CLOSING_TIMESTAMP_TYPE, 'timestamp'])
            // TODO it is defined bellow as well => put definition on top
            const issueProp = issue.getIn([type, 'original'])
            if(!issueProp || issueProp === '') {
              return status.push(false)
            }
            return status.push(
              toTimestamp ?
                      issueProp >= filter.get('timestamp') && issueProp <= toTimestamp :
                      issueProp >= filter.get('timestamp')
            )
          } else {
            const fromTimestamp = activeFilters.getIn([OPENING_TIMESTAMP_TYPE, 'timestamp'])
            const issueProp = issue.getIn([type, 'original'])
            if(!issueProp && issueProp === '') {
              return status.push(false)
            }
            return status.push(
              fromTimestamp && fromTimestamp !== '' ?
                      issueProp <= filter.get('timestamp') && issueProp >= fromTimestamp :
                      issueProp <= filter.get('timestamp')
            )
          }
        }

        }
        // let newStatus = false
      }, List.of())

      // console.log(state.push(fromJS(issue)).count())

      return !listOfFilterResults.includes(false) ? state.push(fromJS(issue[key])) : state
    }
    case SET_FILTER:
    case RESET_FILTERS:
    case INIT_LOAD: {
      // console.log('DEFAULT')
      // console.log('not empty')
      // var t0 = performance.now();
      console.log(issuesReducer.count())

      const filteredItems = issuesReducer.reduce((acc, issue: Map) => {
//         console.log('ISSUE!!!')
//         console.log(issue.toJS())
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

//             console.log(issueProp)
//             console.log(filterBy)

            let newStatus = filterBy.map((value) => {
              return issueProp.indexOf(value.toLowerCase()) !== -1
            })

            // console.log('does it have true?')
            // newStatus.forEach(item => console.log(item))
//             console.log(newStatus.includes(true))

            newStatus = newStatus.includes(true)
            // console.log(issue.getIn([filter.get('type'), 'original']))
            // item[1].toLocaleLowerCase().startsWith(filterByItem.toLocaleLowerCase())
            // console.log(filter.get('by').has(issueProp))
            // console.log(filter.get('by'))
            return status.push(newStatus)
          }
          case OPEN_STATUS_TYPE:
            // console.log(`type is ${type}`)
            // console.log(issue.getIn([type, 'original']))
            // console.log(filter.get('by'))
            // console.log(issue.getIn([type, 'original']) === `${filter.get('by')}`)
            return status.push(issue.getIn([type, 'original']) === `${filter.get('by')}`)
          default: {
            // console.log(`type is ${type}`)
            if (type === OPENING_TIMESTAMP_TYPE) {
              const toTimestamp = activeFilters.getIn([CLOSING_TIMESTAMP_TYPE, 'timestamp'])
              const issueProp = issue.getIn([type, 'original'])
              if(!issueProp || issueProp === '') {
                return status.push(false)
              }
              return status.push(
                toTimestamp && toTimestamp !== '' ?
                        issueProp >= filter.get('timestamp') && issueProp <= toTimestamp :
                        issueProp >= filter.get('timestamp')
              )
            } else {
              const fromTimestamp = activeFilters.getIn([OPENING_TIMESTAMP_TYPE, 'timestamp'])
              const issueProp = issue.getIn([type, 'original'])
//               console.log(issueProp <= filter.get('timestamp'))
              if(!issueProp || issueProp === '') {
                return status.push(false)
              }
//               console.log(issueProp <= filter.get('timestamp'))
//               console.log(fromTimestamp)
              console.log(fromTimestamp && fromTimestamp !== '')
              return status.push(
                fromTimestamp && fromTimestamp !== '' ?
                        issueProp <= filter.get('timestamp') && issueProp >= fromTimestamp :
                        issueProp <= filter.get('timestamp')
              )
            }
          }

          }
          // let newStatus = false
//           console.log(issue.toJS())
//           console.log(listOfFilterResults.toJS())
        }, List.of())

        // console.log(!listOfFilterResults.includes(false))
        // console.log(listOfFilterResults.toJS())

        // console.log('list of filtered results')
        // console.log(listOfFilterResults.includes(false))
//         console.log(listOfFilterResults.toJS())
//         console.log(issue)
        return !listOfFilterResults.includes(false) ? acc.push(issue) : acc
//         return listOfFilterResults
      }, List.of())

      // console.log(filteredItems.includes(false))
      // if the item has false it doesn't pass all the filters
      // so it should not be included
      // console.log(filteredItems.toJS())
      // var t1 = performance.now();
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
//       console.log(filteredItems.toJS())
//       console.log(filteredItems.count())
      return filteredItems
    }
    default:
      console.log('RUUUUUUUUN')
      return state
  }

  // console.log(issuesReducer)
  // console.log(filtersReducer)



  // return issuesReducer
})

export default filtered
