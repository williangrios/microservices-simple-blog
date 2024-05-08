'use client'
import React from 'react'
import { CommentProps } from './interfaces'

interface CommentListProps {
  comments: CommentProps[]
}

function CommentList({ comments }: CommentListProps) {
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
