'use strict'

import papa from 'papaparse'

export function transformJSONtoCSV(json) {
  return papa.unparse(json)
}

export function transformFirebaseEntryToCSV(json) {
  return papa.unparse(json)
}
