import Image from 'next/image'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="">Create post</h1>
      <PostCreate />
      <h1 className="">Posts</h1>
      <PostList />
    </main>
  )
}
