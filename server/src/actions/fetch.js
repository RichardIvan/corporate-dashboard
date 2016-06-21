import { INIT_LOAD, NEW_ISSUE } from './constants'

export function initialFetch(data) {
  return {
    type: INIT_LOAD,
    payload: {
      data,
    },
  }
}

export function newIssue(data) {
  return {
    type: NEW_ISSUE,
    payload: {
      data,
    },
  }
}
