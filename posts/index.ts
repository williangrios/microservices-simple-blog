import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'

const app = express()
app.use(bodyParser.json())

interface PostProps {
  postId: string
  title: string
}

const posts: PostProps[] = []

app.get('/posts', (res: Response) => {
  res.send(posts)
})

app.post('/posts', (req: Request, res: Response) => {
  const postId = randomBytes(4).toString('hex')
  const { title } = req.body
  const newPost: PostProps = {
    postId,
    title,
  }
  posts.push(newPost)
  res.status(201).send(newPost)
})

app.listen(4000, () => {
  console.log('Posts Service Listing on 4000')
})
