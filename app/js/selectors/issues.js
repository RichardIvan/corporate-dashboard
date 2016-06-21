'use strict'

export function getVisibleIssues(state) {
  console.log(state)
  const issues = state.issues.toJS()
  const array = Object.keys(issues).map((issue) => issues[issue])

  return array
}
