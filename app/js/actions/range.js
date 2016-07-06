/* @flow */
'use strict'

import moment from 'moment'

import cloneDeep from 'lodash/cloneDeep'
import { SET_RANGE } from '../actions/constants'

export function setRange(pl) {
  const type = SET_RANGE

  const payload = cloneDeep(pl)
  if (!payload) {
    throw new Error('No payload given')
  }

  switch (payload.range) {
  case 'all':
    return {
      type,
      payload: {
        range: 'all',
      },
    }
  case 'set': {
    if (typeof payload.from !== 'number' && typeof payload.to !== 'number' ) {
      throw new Error('From or to is not a number')
    }
    const now = moment().startOf('day')
    if (typeof payload.from !== 'number') {
      if ( +now.format('x') <= payload.to ) {
        payload.to = +now.format('x')
        payload.from = +now.subtract(7, 'days')
      }
      payload.from = +moment(payload.to).subtract(7, 'days').format('x')
    } else {
      const from = +now.subtract(7, 'days').format('x')
      if ( from < payload.from ) {
        payload.from = from
        payload.to = +now.format('x')
      }
      payload.to = +moment(payload.from).add(7, 'days').format('x')
    }
    return {
      type,
      payload: {
        range: payload.range,
        from: payload.from,
        to: payload.to,
      },
    }
  }
  default:
    throw new Error('No correct range provided')
  }
}
