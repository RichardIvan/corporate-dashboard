/* @flow */
'use strict'

import uniq from 'lodash/uniq'

export function getAllNames(state) {
  return uniq(state.partials.name.toJS())
}
