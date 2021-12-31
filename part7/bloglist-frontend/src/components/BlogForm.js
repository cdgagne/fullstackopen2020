import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showBlogForm, hideBlogForm } from '../reducers/blogFormReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const dispatch = useDispatch()
  const state = useSelector(state => state.blogForm)

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    try {
      await dispatch(createBlog(blog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      dispatch(hideBlogForm())
    } catch (error) {
    }
  }

  const handleCancelButton = async (event) => {
    event.preventDefault()
    dispatch(hideBlogForm())
  }

  const handleNewBlogButton = async (event) => {
    event.preventDefault()
    dispatch(showBlogForm())
  }

  if (state.visible === true) {
    return (
      <div>
        <form onSubmit={handleCreate}>
          <div>
            Title:{' '}
            <input
              type='text'
              id='blogTitle'
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            Author:{' '}
            <input
              type='text'
              id='blogAuthor'
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            URL:{' '}
            <input
              type='text'
              id='blogUrl'
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type='submit'>Create</button>
        </form>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
    )
  } else {
    return (
      <button onClick={handleNewBlogButton}>New Blog</button>
    )
  }
} 

export default BlogForm