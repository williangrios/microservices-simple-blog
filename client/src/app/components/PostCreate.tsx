'use client'
import React, { useState } from 'react'

function PostCreate() {
  const [title, setTitle] = useState('')

  const handlePostCreate = async (event: any) => {
    event.preventDefault()
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    }
    await fetch('http://posts.com/posts/create', requestOptions)
    setTitle('')
  }

  return (
    <div className="mt-2">
      <form
        action=""
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={handlePostCreate}
      >
        <div className="flex gap-2 items-center">
          <label htmlFor="" className="">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 rounded-lg text-gray-800"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-400 p-2 w-full rounded-lg ">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PostCreate
