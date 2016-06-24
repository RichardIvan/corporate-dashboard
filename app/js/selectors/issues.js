'use strict'

export function getIssues(state) {
  const issues = state.issues.toJS()
  return issues
}
