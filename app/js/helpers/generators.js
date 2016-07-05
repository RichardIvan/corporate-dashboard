/* @flow */
'use strict'

// TODO write tests
import reduce from 'lodash/reduce'

import { transformItem } from './transformators'

export function generateShortVersions(data) {
  const transformed = reduce(data, (acc, issue) => {
    const keys = Object.keys(issue)

    const transformedIssue = reduce(issue, (acm, value, key) => {
      // console.log(issue)
      // console.log(key)
      // console.log(value)
      return { ...acm, [key]: {
        original: issue[key],
        transformed: transformItem(key, value),
      } }
    }, {})

    return { ...acc, [issue.id]: transformedIssue }
  }, {})

  return transformed
}
