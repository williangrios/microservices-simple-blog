// 4005
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const events: any[] = []

app.post('/events', async (req: Request, res: Response) => {
  const event = req.body

  events.push(event)

  axios.post('http://localhost:4000/events', event)
  axios.post('http://localhost:4001/events', event)
  axios.post('http://localhost:4002/events', event)
  axios.post('http://localhost:4003/events', event)
  res.status(201).send({ status: 'OK' })
})

app.get('/events', (req: Request, res: Response) => {
  res.status(200).send(events)
})

const PORT = 4005
app.listen(PORT, () => {
  console.log('Event bus runnning on port ', PORT)
})
