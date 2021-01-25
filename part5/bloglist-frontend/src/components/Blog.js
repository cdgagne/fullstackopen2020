import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(likedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => like(blog)}>like</button></p>
          <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
