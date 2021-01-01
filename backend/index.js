import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
const server = http.Server(app)
const PORT = process.env.BE_PORT || 7000

server.listen(PORT, () => {
  console.log(`server listening. [http://localhost:${PORT}]`)
})

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`)
// })

const io = socketIO.listen(server)

let records = [] // 簡易DBとして

io.on('connection', (socket) => {
  socket.on('message', (record) => {
    console.log(`message: ${record.msg}`)

    const today = new Date()
    const createdAt = `${today.getHours()}時${today.getMinutes()}分${('0' +today.getSeconds()).slice(-2)}秒`
    const returnRecord = {
      ...record,
      createdAt
    }
    records.push(returnRecord)

    io.emit('message', returnRecord)
  })

  // join user
  socket.on('user in', ({ username }) => {
    console.log(`join user: ${username}`)

    const id = socket.id
    records.forEach(record => {
      io.to(id).emit('message', record)
    })
  })
})