import io from "socket.io-client"
import config from '@/config'

export default (vueInstance) => {

  console.log('Starting socket connection at ' + config[process.env.NODE_ENV]['BASE_WS_URL'])
  const socket = io(config[process.env.NODE_ENV]['BASE_WS_URL'], {
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 20,
  })

  socket.on('connect', () => {
    console.log('Socket successfully connected')
  })
  socket.on('disconnected', () => {
    console.log('Socket disconnected')
  })

  socket.on('error', () => {
    console.log('Socket error')
  })

  vueInstance.provide('socket', socket)

}
