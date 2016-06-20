import io from 'socket.io-client'
import { initLoad } from '../actions'

export function connectToSocket (store) {
  const socket = io('http://localhost:3333')

  socket.on('data', (data) => {

    console.log('ANNOUNTING, WE HAVE DATA')
    store.dispatch(initLoad(data))

    console.log(data)
  })
}
