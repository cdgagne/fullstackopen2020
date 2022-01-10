import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <BlogForm />

      {blogs.map((blog) => (
        <div style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
      ))}
    </div>
  )
}

export default Blogs