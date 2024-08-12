import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use(cors())

server.use('/api/v1', router)

export default server