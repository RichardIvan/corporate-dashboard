import { INIT_LOAD, PUSH_DATA } from './constants'

export function initialFetch(data) {
  return {
    type: INIT_LOAD,
    payload: {
      data: data.data,
      payingCustomersData: data.payingCustomersData,
    },
  }
}

export function pushData(data) {
  return {
    type: PUSH_DATA,
    payload: {
      ...data,
    },
  }
}
