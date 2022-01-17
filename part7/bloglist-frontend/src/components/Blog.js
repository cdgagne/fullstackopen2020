import React, { useState } from 'react'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

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
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <Table>
        <tbody>
          <tr>
            <td>URL</td><td><a href={`${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a></td>
          </tr>
          <tr>
            <td>Likes</td><td>{blog.likes} <button className="likeButton" onClick={() => like(blog)}>like</button></td>
          </tr>
          <tr>
            <td>Added by</td><td>{blogUser}</td>
          </tr>
          <tr>
            <td><button style={showWhenBlogUser(blog)} onClick={() => remove(blog)}>remove</button></td>
          </tr>
        </tbody>
      </Table>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control type="text" value={comment} onChange={handleCommentChange}/>
          <Button variant="primary" type="submit">Add Comment</Button>
        </Form.Group>
      </Form>
      <h3>Comments</h3>
      <ul>{blog.comments.map((n, i) => <li key={`${blog.id}-${i}`}>{n}</li>)}</ul> 
    </div>
  )
}

export default Blog