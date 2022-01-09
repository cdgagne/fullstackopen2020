import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div>
      <BlogForm />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  )
}

export default Blogs