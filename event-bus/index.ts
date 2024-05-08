import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/events', async (req: Request, res: Response) => {
  const event = req.body
  axios.post('http://localhost:4000/events', event)
  axios.post('http://localhost:4001/events', event)
  axios.post('http://localhost:4002/events', event)
  res.status(201).send({ status: 'OK' })
})

const PORT = 4003
app.listen(PORT, () => {
  console.log('Event bus runnning on port ', PORT)
})
