import cors from 'cors'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface PostsQueryProps {
  postId: string
  title: string
  comments: CommentQueryProps[]
}

interface CommentQueryProps {
  commentId: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
}

const posts: PostsQueryProps[] = []

const handleEvent = (type: any, data: any) => {
  if (type === 'PostCreated') {
    const { postId, title } = data
    const newPost: PostsQueryProps = {
      postId,
      title,
      comments: [],
    }
    posts.push(newPost)
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId, status } = data

    const newComment: CommentQueryProps = {
      commentId,
      content,
      status,
    }

    const postIndex = posts.findIndex((post) => post.postId === postId)
    if (postIndex !== -1) {
      posts[postIndex].comments.push(newComment)
    } else {
      console.log(`Post with ID ${postId} not found.`)
    }
  }

  if (type === 'CommentUpdated') {
    const { commentId, content, postId, status } = data
    const post = posts.find((post) => post.postId === postId)
    const comment = post?.comments.find(
      (comment) => (comment.commentId = commentId)
    )
    if (comment) {
      comment.status = status
      comment.content = content
    }
  }
}

app.get('/posts', async (req: Request, res: Response) => {
  res.status(200).send(posts)
})

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body
  handleEvent(type, data)
  res.send({})
})

const PORT = 4002

app.listen(PORT, async () => {
  console.log('QUERY listen on: ', PORT)
  const res = await axios.get('http://localhost:4005/events')
  for (const event of res.data) {
    console.log('Processing event', event.type)
    handleEvent(event.type, event.data)
  }
})
