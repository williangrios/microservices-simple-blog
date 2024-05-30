// 4001
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface CommentProps {
  commentId: string
  postId: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
}

const comments: CommentProps[] = []

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  const postId = req.params.postId
  const commentsById = comments.filter((comment) => comment.postId === postId)
  res.send(commentsById)
})

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex')
  const postId = req.params.id
  const { content } = req.body
  const newComment: CommentProps = {
    commentId,
    content,
    postId,
    status: 'pending',
  }
  comments.push(newComment)
  // post to event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: newComment,
  })
  res.status(201).send(newComment)
})

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body
  if (type === 'CommentModerated') {
    const { commentId, status, content } = data
    const commentSelected = comments.find(
      (item) => item.commentId === commentId
    )
    if (commentSelected) {
      commentSelected.status = status
    }
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        commentId,
        content,
        status,
      },
    })
  }
})

const PORT = 4001
app.listen(PORT, () => {
  console.log('Comment Service runnning on port ', PORT)
})
