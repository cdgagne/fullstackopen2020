import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import Info from './components/Info'
import Togglable from './components/Togglable'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

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
}

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const addBlog = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  if (user === null) {
    return <Login />
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
            user={user}
          />
        ))}
      </div>
    )
  }
}

export default App