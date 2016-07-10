import io from 'socket.io-client'

import { INIT_LOAD, PUSH_DATA } from '../actions'

import { transformCSVtoJSON, transformNewIssue } from '../reducers/helpers'
import { generateShortVersions } from '../helpers/generators'

export function connectToSocket (store) {
  const socket = io('http://localhost:3333')

  socket.on('data', (response) => {
    console.log('ANNOUNTING, WE HAVE DATA')

    const action = response.action
    const type = action.type

    switch (type) {
    case INIT_LOAD: {
      const csv = action.payload.data
      const json = transformCSVtoJSON(csv)
//       console.log(generateShortVersions(json))
      action.payload.data = generateShortVersions(json)
      break
    }
    case PUSH_DATA: {
      const json = transformNewIssue(action.payload.data)

      action.payload.data = generateShortVersions(json)
      break
    }
    default:
     break
    }

//     console.log(action)

    store.dispatch(action)

  })
}
