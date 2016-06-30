/* @flow */
'use strict'

export function getDataByType(type: string, state: Object): Array<Array<string|number|bool>> {
  // console.log(state.partials[type].toJS())
  return state.partials[type]
}
