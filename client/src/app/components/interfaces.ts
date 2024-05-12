export interface PostProps {
  postId: string
  title: string
  comments: CommentProps[]
}

export interface CommentProps {
  commentId: string
  postId: string
  content: string
  status: string
}
