import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('bloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    const response = await blogService.create(blogObject)
    console.log(response)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>username <input type="text" name="username" value={username} onChange={({target}) => setUsername(target.value)} /></div>
        <div>password <input type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} /></div>
        <button type="submit">Login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>

        <form onSubmit={handleLogout}><p>{user.name} is logged in <button type="submit">Logout</button></p></form>

        <form onSubmit={handleCreate}>
          <div>Title: <input type="text" name="blog-title" value={blogTitle} onChange={({target}) => setBlogTitle(target.value)} /></div>
          <div>Author: <input type="text" name="blog-author" value={blogAuthor} onChange={({target}) => setBlogAuthor(target.value)} /></div>
          <div>URL: <input type="text" name="blog-url" value={blogUrl} onChange={({target}) => setBlogUrl(target.value)} /></div>
          <button type="submit">Create</button>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App