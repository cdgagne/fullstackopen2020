import React, { useState } from 'react'

const BlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    await props.createBlog(blogObject)
  }

  return (
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
  )
}

export default BlogForm
