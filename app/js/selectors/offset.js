/* @flow */
'use strict'

export function getOffset(state: Object): number {
  return state.offset.get('value')
}
