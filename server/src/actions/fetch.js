import { INIT_LOAD } from './constants'

export function initialFetch (data) {
  return {
    type: INIT_LOAD,
    payload: {
      data,
    },
  }
}
