/* @flow */
'use strict'

import moment from 'moment'

import cloneDeep from 'lodash/cloneDeep'
import { SET_RANGE } from '../actions/constants'

function getActionAccordingToButtonPressed(buttonType: string, payload) {
  const action = {
    type: SET_RANGE,
    payload: {
      range: 'set',
      from: 0,
      to: 0,
    },
  }
  if (typeof payload.from === 'number') {
    if (buttonType === 'previous') {
      action.payload.from = +moment(payload.from)
                              .startOf('day')
                              .subtract(7, 'days')
                              .format('x')
      action.payload.to = payload.from
    } else {
      action.payload.from = +moment(payload.from)
                              .startOf('day')
                              .add(7, 'days')
                              .format('x')
      action.payload.to = +moment(payload.from)
                            .startOf('day')
                            .add(14, 'days')
                            .format('x')
    }
  } else {
    if (buttonType === 'previous') {
      action.payload.from = +moment(payload.to)
                              .startOf('day')
                              .subtract(14, 'days')
                              .format('x')
      action.payload.to = +moment(payload.to)
                            .startOf('day')
                            .subtract(7, 'days')
                            .format('x')
    } else {
      action.payload.from = payload.to
      action.payload.to = +moment(payload.to)
                            .startOf('day')
                            .add(7, 'days')
                            .format('x')
    }
  }
  // const now = moment()
  const to = action.payload.to
  if (to > +moment().startOf('day').format('x')) {
    action.payload.from = +moment()
                            .startOf('day')
                            .subtract(7, 'days')
                            .format('x')
    action.payload.to = +moment()
                          .startOf('day')
                          .format('x')
  }
  return action
}

type setRangeActionSet = {
  type: string,
  payload: {
    range: string,
    from: number,
    to: number,
  }
}

type setRangeActionAll = {
  type: string,
  payload: {
    range: string,
  }
}

export function setRange(pl: Object): setRangeActionSet | setRangeActionAll {
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
    const buttonType = payload.type
    if (typeof payload.from !== 'number') {
      if (+now.format('x') <= payload.to) {
        if ( buttonType === 'next' || buttonType === 'previous') {
          return getActionAccordingToButtonPressed(buttonType, payload)
        } else {
          payload.to = +now.format('x')
          payload.from = +now.subtract(7, 'days')
        }
      }
      if ( buttonType === 'next' || buttonType === 'previous') {
        return getActionAccordingToButtonPressed(buttonType, payload)
      } else {
        payload.from = +moment(payload.to).subtract(7, 'days').format('x')
      }
    } else {
      const from = +now.subtract(7, 'days').format('x')
      if (from < payload.from) {
        if (buttonType === 'next' || buttonType === 'previous') {
          return getActionAccordingToButtonPressed(buttonType, payload)
        } else {
          payload.from = from
          payload.to = +now.format('x')
        }
      }
      if (buttonType === 'next' || buttonType === 'previous') {
        return getActionAccordingToButtonPressed(buttonType, payload)
      } else {
        payload.to = +moment(payload.from).add(7, 'days').format('x')
      }
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
