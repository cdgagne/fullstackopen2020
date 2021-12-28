import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const showWhenBlogUser = (blog) => ({ display: ((blog.user !== undefined) && (blog.user.username === user.username)) ? '' : 'none' })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const blogUser = (blog.user ? blog.user.username : 'anonymous')

  return (
    <div className='blog' style={blogStyle}>
      <div className='blogTitleAndAuthor'>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></div>
      <div className='blogDetails' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button className="likeButton" onClick={() => like(blog)}>like</button></p>
        <p>{blog.id}</p>
        <p>{blogUser}</p>
        <p><button style={showWhenBlogUser(blog)} onClick={() => remove(blog)}>remove</button></p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog