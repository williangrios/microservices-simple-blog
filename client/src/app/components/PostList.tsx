'use client'
import React, { useState, useEffect } from 'react'
import { PostProps } from './interfaces'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

function PostList() {
  const [posts, setPosts] = useState<PostProps[]>([])

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:4000/posts')
    const data = await response.json()
    console.log('data', data)

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="mt-10 flex flex-col gap-2">
      <h2 className="text-lg">Posts</h2>
      {posts.map((post: PostProps) => {
        return (
          <div
            className="p-4 rounded-lg border-gray-600 border-2 w-[400px]"
            key={post.postId}
          >
            <h3 className="">{post.title}</h3>
            <CommentList postId={post.postId} />
            <CommentCreate postId={post.postId} />
          </div>
        )
      })}
    </div>
  )
}

export default PostList