import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface PostProps {
  postId: string
  title: string
}

const posts: PostProps[] = [
  {
    postId: '923789d23h',
    title: 'post 1',
  },
  {
    postId: '923729d23h',
    title: 'post 2',
  },
  {
    postId: '923749d23h',
    title: 'post 3',
  },
]

app.get('/posts', (req: Request, res: Response) => {
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
