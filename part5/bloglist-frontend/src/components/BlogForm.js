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
        await props.createBlog(blogObject)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
      <form onSubmit={handleCreate}>
        <div>Title: <input type="text" name="blog-title" value={blogTitle} onChange={({target}) => setBlogTitle(target.value)} /></div>
        <div>Author: <input type="text" name="blog-author" value={blogAuthor} onChange={({target}) => setBlogAuthor(target.value)} /></div>
        <div>URL: <input type="text" name="blog-url" value={blogUrl} onChange={({target}) => setBlogUrl(target.value)} /></div>
        <button type="submit">Create</button>
      </form>
    )
}

export default BlogForm