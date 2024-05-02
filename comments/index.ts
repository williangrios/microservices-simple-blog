import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { randomBytes } from 'crypto'

const app = express()
app.use(bodyParser.json())

interface CommentProps {
  commentId: string
  postId: string
  content: string
}

const comments: CommentProps[] = []

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  const postId = req.params.id
  const commentsById = comments.find((comment) => comment.postId === postId)
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

app.listen(5000, () => {
  console.log('Comments service Listen on port 5000')
})
