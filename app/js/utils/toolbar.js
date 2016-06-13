'use strict'

// export function resolveHeading(route) {
//   return route
// }

export function setFormFocus(id = null, focus = null) {
  if (id === null) throw new Error('Must specify a form to set focus')

  return {
    // type: SET_FORM_FOCUS,
    payload: {
      id,
      focus,
    },
  }
}
