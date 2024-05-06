export interface PostProps {
  postId: string
  title: string
}

export interface CommentProps {
  commentId: string
  postId: string
  content: string
}
