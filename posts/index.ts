// 4000
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface PostProps {
  postId: string
  title: string
}

const posts: PostProps[] = []

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts)
})

app.post('/posts', async (req: Request, res: Response) => {
  const postId = randomBytes(4).toString('hex')
  const { title } = req.body
  const newPost: PostProps = {
    postId,
    title,
  }
  posts.push(newPost)
  // post to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: newPost,
  })
  res.status(201).send(newPost)
})

app.post('/events', async (req: Request, res: Response) => {})

const PORT = 4000
app.listen(PORT, () => {
  console.log('Post Service runnning on port ', PORT)
})
