export interface PostProps {
  id: string
  title: string
  comments: CommentProps[]
}

export interface CommentProps {
  commentId: string
  postId: string
  content: string
}
