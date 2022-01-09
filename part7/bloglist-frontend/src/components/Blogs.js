import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const authnuser = useSelector(state => state.authnuser)

  return (
    <div>
      <BlogForm />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={authnuser}
        />
      ))}
    </div>
  )
}

export default Blogs