'use strict'

import { is, isMap } from 'immutable'

export function getVisibleIssues(state) {
  // console.log(state.issues.isMap())

  console.log(state.issues.size)
  console.log(state.issues.toJS())
  const issues = state.issues.toJS()
  const array = Object.keys(issues).map(issue => issues[issue])
  // const issues =
  // console.log(state.size)

  // if(!state.issues)
  //   return []
  // if(!state.has('issues'))
  //   return []
  // console.log(state.is(Map))
  // const issues = state.get('issues')
  // console.log(issues)
  console.log(array)

  return array
}
