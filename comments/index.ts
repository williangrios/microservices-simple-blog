import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface CommentProps {
  commentId: string
  postId: string
  content: string
}

const comments: CommentProps[] = [
  {
    postId: '923789d23h',
    commentId: '923789d233',
    content: 'comentario do post 1',
  },
  {
    postId: '923729d23h',
    commentId: '923789d23x',
    content: 'comentario do post 2',
  },
  {
    postId: '923749d23h',
    commentId: '923789d23a',
    content: 'comentario do post 3',
  },
  {
    postId: '923749d23h',
    commentId: '923789d23u',
    content: 'comentario do post 3',
  },
]

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  const postId = req.params.id
  const commentsById = comments.filter((comment) => comment.postId === postId)
  res.send(commentsById)
})

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex')
  const postId = req.params.id
  const { content } = req.body
  const newComment: CommentProps = {
    commentId,
    content,
    postId,
  }
  comments.push(newComment)
  res.status(201).send(newComment)
})

app.listen(4001, () => {
  console.log('Comments service Listen on port 4001')
})
