'use client'
import React, { useState, useEffect } from 'react'
import { CommentProps } from './interfaces'

interface CommentListProps {
  postId: string
}

function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<CommentProps[]>([])

  const fetchComments = async () => {
    const response = await fetch(
      `http://localhost:4001/posts/${postId}/comments`
    )
    const data = await response.json()
    console.log('resposta', data)

    setComments(data)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div>
      <ul className="">
        {comments?.map((comment) => {
          return (
            <li key={comment.commentId} className="ml-4">
              -- {comment.content}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CommentList
