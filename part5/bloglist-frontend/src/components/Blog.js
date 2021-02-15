import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const showWhenBlogUser = (blog) => ({ display: (blog.user === user.id) ? '' : 'none' })

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

  const remove = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog)
    }
  }

  const blogUser = (blog.user ? blog.user.username : 'anonymous')

  return (
    <div style={blogStyle}>
      <div className='blogTitleAndAuthor'>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></div>
      <div className='blogDetails' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => like(blog)}>like</button></p>
        <p>{blog.id}</p>
        <p>{blogUser}</p>
        <p><button style={showWhenBlogUser(blog)} onClick={() => remove(blog)}>remove</button></p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog