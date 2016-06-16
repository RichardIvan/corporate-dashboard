import { normalize } from 'normalizr'
import { isPending } from '../selectors'

export function createFetchAction(type = null, {
  url,
  method = 'GET',
  id = `${method} ${url}`,
  meta,
  schema,
  ...options,
} = {}) {
  if (type === null) throw new Error('Must specify an action type to create fetch action')
  if (typeof url !== 'string') throw new Error(`Must specify a url to create ${type} action`)

  let opts = options

  if (opts.body && typeof opts.body !== 'string') {
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts.body),
    }
  }

  return (dispatch, getState) => {
    if (isPending(getState(), id)) return Promise.resolve()

    dispatch({
      type,
      meta: {
        ...meta,
        pending: { id },
      },
    })

    return Promise.resolve()
      .then(dispatch({
        type,
        payload: 'asdf',
        meta: {
          ...meta,
          pending: { id, completed: true },
        },
      }))

    // return fetch(url, {
    //   credentials: 'same-origin',
    //   method,
    //   ...opts,
    // })
    //
    // // Normalize the result of the fetch and catch error conditions
    // .then((resp) => resp.json().then((json) => ({
    //   error: !resp.ok,
    //   payload: json,
    // }), () => ({
    //   error: true,
    //   payload: {
    //     message: 'Server Error',
    //   },
    // })), () => ({
    //   error: true,
    //   payload: {
    //     message: 'Network Error',
    //   },
    // }))
    //
    // .then(({ error, payload }) => dispatch({
    //   type,
    //   error,
    //   payload: schema && !error ? normalize(payload, schema) : payload,
    //   meta: {
    //     ...meta,
    //     pending: { id, completed: true },
    //   },
    // }))
  }
}
