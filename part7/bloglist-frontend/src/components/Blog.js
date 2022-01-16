import React, { useState } from 'react'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

const Blog = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(n => n.id === blogId)

  const [comment, setComment] = useState("")

  const authnuser = useSelector(state => state.authnuser)

  if (!blog) {
    return null
  }

  const showWhenBlogUser = (blog) => ({ display: ((blog.user !== undefined) && (blog.user.username === authnuser.username)) ? '' : 'none' })

  const like = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      history.push('/blogs')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    dispatch(addComment(blog, comment))
  }

  const handleCommentChange = async (e) => {
    setComment(e.target.value)
  }

  const blogUser = (blog.user ? blog.user.username : 'anonymous')

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={`${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <p>likes {blog.likes} <button className="likeButton" onClick={() => like(blog)}>like</button></p>
      <p>added by {blogUser}</p>
      <p><button style={showWhenBlogUser(blog)} onClick={() => remove(blog)}>remove</button></p>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input type="text" value={comment} onChange={handleCommentChange}/>
        <input type="submit" value="Add Comment" />
      </form>
      <ul>{blog.comments.map((n, i) => <li key={`${blog.id}-${i}`}>{n}</li>)}</ul> 
    </div>
  )
}

export default Blog