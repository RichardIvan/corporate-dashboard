/* @flow */
'use strict'

import { getDataByType } from '../selectors'

import {
  CLOSE_FILTER_COMPONENT,
  SET_FILTER_COMPONENT_MENU_STATE,
  SET_FILTER_COMPONENT_OPEN_STATUS,
  RESET_FILTER_COMPONENT_STATE,
  FILTER_SEARCH_RESULT,
} from './constants'

export function setSearchFilterValues(type: string, value: string, state) {
  const results = getDataByType(type, state).filter((item) =>
                    item.get(1)
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) !== -1
                    )
  return {
    type: FILTER_SEARCH_RESULT,
    payload: {
      'type': type,
      'value': value,
      results,
    },
  }
}

export function closeFilterMenu(): Object {
  return {
    type: CLOSE_FILTER_COMPONENT,
  }
}

export function selectFilterMenu(type: string): Object {
  return {
    type: SET_FILTER_COMPONENT_MENU_STATE,
    payload: type,
  }
}

export function openFilterMenu(): Object {
  return {
    type: SET_FILTER_COMPONENT_OPEN_STATUS,
    payload: true,
  }
}

export function filterComponentBack(): Object {
  return {
    type: RESET_FILTER_COMPONENT_STATE,
  }
}
