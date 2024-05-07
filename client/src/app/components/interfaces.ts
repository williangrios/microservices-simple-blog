export interface PostProps {
  id: string
  title: string
}

export interface CommentProps {
  commentId: string
  postId: string
  content: string
}
