import React, { useState } from 'react'

interface CommentCreateProps {
  postId: string
}

function CommentCreate({ postId }: CommentCreateProps) {
  const [content, setContent] = useState('')
  const handleSendComment = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
      // cache: cache === 'no-cache' && method === 'GET' ? 'no-cache' : undefined
    }
    await fetch(
      `http://localhost:4001/posts/${postId}/comments`,
      requestOptions
    )
    setContent('')
  }
  return (
    <div>
      <form action="" className="" onSubmit={(e) => handleSendComment(e)}>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="" className="">
            New comment
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-1 rounded-lg text-gray-800"
          />
          <button className="bg-blue-500 hover:bg-blue-400 p-2 w-full rounded-lg ">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentCreate
