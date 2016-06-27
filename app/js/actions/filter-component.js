/* @flow */
'use strict'

import {
  CLOSE_FILTER_COMPONENT,
  SET_FILTER_COMPONENT_MENU_STATE,
  SET_FILTER_COMPONENT_OPEN_STATUS,
  RESET_FILTER_COMPONENT_STATE,
} from './constants'

export function closeFilterComponent() {
  return {
    type: CLOSE_FILTER_COMPONENT,
  }
}

export function selectFilterMenu(type: string) {
  return {
    type: SET_FILTER_COMPONENT_MENU_STATE,
    payload: type,
  }
}

export function openFilterComponent() {
  return {
    type: SET_FILTER_COMPONENT_OPEN_STATUS,
    payload: true,
  }
}

export function filterComponentBack() {
  return {
    type: RESET_FILTER_COMPONENT_STATE,
  }
}
