import io from 'socket.io-client'

export function connectToSocket (store) {
  const socket = io('http://localhost:3333')

  socket.on('data', (response) => {

    console.log('ANNOUNTING, WE HAVE DATA')
    store.dispatch(response.action)

    console.log(response)
  })
}
