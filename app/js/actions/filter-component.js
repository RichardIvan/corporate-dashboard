/* @flow */
'use strict'

import filter from 'lodash/filter'
import uniq from 'lodash/uniq'

import { getDataByType } from '../selectors'

import {
  CLOSE_FILTER_COMPONENT,
  SET_FILTER_COMPONENT_MENU_STATE,
  SET_FILTER_COMPONENT_OPEN_STATUS,
  RESET_FILTER_COMPONENT_STATE,
  FILTER_SEARCH_RESULT,
} from './constants'

export function setSearchFilterValues(type: string, value: string, state) {
  // we need to store here the previous value we enetered
  // and compare the new and old one
  // so we can figure out if we need to remove the old one
  // or add the old one from the filter

  const result = uniq(filter(getDataByType(type, state), (item) =>
    item[1].toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
  )

  // perform fuse search here

  return {
    type: FILTER_SEARCH_RESULT,
    payload: {
      'type': type,
      'value': value,
      result,
    },
  }
}

export function closeFilterMenu() {
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

export function openFilterMenu() {
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
