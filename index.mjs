import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const server = http.Server(app)
const PORT = 7000

server.listen(PORT, () => {
  console.log(`server listening. [http://localhost:${PORT}]`)
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const io = socketIO.listen(server)

let msgs = [] // 簡易DBとして

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(`message: ${msg}`)

    const today = new Date()
    const todayTimestamp = `${today.getHours()}時${today.getMinutes()}分${('0' +today.getSeconds()).slice(-2)}秒`
    const sendMsg = `${msg} / ${todayTimestamp}`
    msgs.push(sendMsg)

    io.emit('message', sendMsg)
  })

  // join user
  socket.on('user in', (name) => {
    console.log('join user')

    const id = socket.id

    msgs.forEach(msg => {
      io.to(id).emit('message', msg)
    })
  })
})