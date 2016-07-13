/* @flow */
'use strict'

import {
  Map,
  List,
} from 'immutable'

import moment from 'moment'
import reduce from 'lodash/reduce'
import cloneDeep from 'lodash/cloneDeep'

import {
  getDatesInRange,
} from '../../selectors/graph-data-helpers/general-graph-data-helpers'


export function constructRange(issue: Object): Map {
  const from = issue.opening_timestamp.original
  const closingStamp = issue.closing_timestamp.original
  const status = issue.open_status.original
  let to
  if (status === 'true' || status === true) {
    to = +moment().startOf('day').format('x')
  } else {
    to = +moment(closingStamp, 'x').startOf('day').format('x')
  }
  return new Map({
    from,
    to,
  })
}

export function constructPath(path: Array<string>, date: string): Array<string> {
  const dateArray = date.split('/')
  return path.concat(dateArray).concat(['openIssuesData'])
}

export function fillIssues(state: Map, i: Object): Map {
  const issue = cloneDeep(i)
  const path: Array<string> = ['data']
  const range = constructRange(issue)
  const dates: List<string> = getDatesInRange(range)
  // console.log(issue);
  const issueID = issue.id.original
  const sss = dates.reduce((acc, date) => {
    const p = constructPath(path, date)
    const entry = acc.getIn(p)
    // console.log(p)
    if (!entry) {
      return acc.setIn(p.concat(issueID))
    }
    // console.log(entry.toJS());
    if (entry.has(issueID)) {
      return acc
    }
    return acc.setIn(p.concat(issueID))
  }, state)
  // console.log(sss.toJS())
  return sss
}

// data passed in is json issues 0bject
// state passed in is the complete state
export function addOpenIssuesData(state: Map, data: Object): Map {
  const transformed = reduce(data, (acc, issue) => {
    return fillIssues(acc, issue)
  }, state)
  // console.log('transformed');
  // console.log(transformed.toJS())
  return transformed
}
