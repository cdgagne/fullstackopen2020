import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import Info from './components/Info'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { createInfoNotification, createErrorNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs, createBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayError('Wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('bloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const setAndSortBlogs = (blogs) => {
    dispatch(setBlogs(blogs))
  }

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      displayInfo(`A new blog '${blog.title}' by ${blog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      displayError(exception.response.data.error)
    }
}

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog)
      setAndSortBlogs(blogs.map((b) => (blog.id === b.id ? blog : b)))
    } catch (exception) {
      displayError(exception.response.data.error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog)
      const blogs = await blogService.getAll(blog)
      setAndSortBlogs(blogs)
    } catch (exception) {
      displayError('Error removing blog')
    }
  }

  const displayError = (message) => {
    dispatch(createErrorNotification(message))
  }

  const displayInfo = (message) => {
    dispatch(createInfoNotification(message))
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
        <Error />
        <Info />
        <form id='login-form' onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>Login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Error />
        <Info />

        <form onSubmit={handleLogout}>
          <p>
            {user.name} is logged in <button type='submit'>Logout</button>
          </p>
        </form>

        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    )
  }
}

export default App
