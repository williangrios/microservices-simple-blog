// 4003
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body
  if (type === 'CommentCreated') {
    const status = data.content.includes('fuck you') ? 'rejected' : 'approved'
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        commentId: data.commentId,
        postId: data.postId,
        status,
        content: data.content,
      },
    })
  }
  res.status(200).send({})
})

const PORT = 4003
app.listen(PORT, () => {
  console.log('Moderation listen on port: ', PORT)
})
