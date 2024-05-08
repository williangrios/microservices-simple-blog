import cors from 'cors'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
app.use(cors())

interface PostsQueryProps {
  id: string
  title: string
  comments: CommentQueryProps[]
}

interface CommentQueryProps {
  commentId: string
  content: string
}

const posts: PostsQueryProps[] = []

app.get('/posts', async (req: Request, res: Response) => {
  res.status(200).send(posts)
})

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body
  if (type === 'PostCreated') {
    const { postId, title } = data
    const newPost: PostsQueryProps = {
      id: postId,
      title,
      comments: [],
    }
    posts.push(newPost)
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId } = data

    const newComment: CommentQueryProps = {
      commentId,
      content,
    }

    const postIndex = posts.findIndex((post) => post.id === postId)
    if (postIndex !== -1) {
      posts[postIndex].comments.push(newComment)
    } else {
      console.log(`Post with ID ${postId} not found.`)
    }
  }
})

const PORT = 4002

app.listen(PORT, () => {
  console.log('QUERY listen on: ', PORT)
})
