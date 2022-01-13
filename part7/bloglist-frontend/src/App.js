import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Error from './components/Error'
import Info from './components/Info'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/authnReducer'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

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
  const authnuser = useSelector(state => state.authnuser)

  const dispatch = useDispatch()

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
      const authnuser = JSON.parse(userJSON)
      dispatch(setUser(authnuser))
    }
  }, [dispatch])

  const navBarStyle = {
    padding: 5,
    display: "inline"
  }

  if (authnuser === null) {
    return <Login />
  } else {
    return (
      <Router>
        <div>
          <Link style={navBarStyle} to="/">blogs</Link>
          <Link style={navBarStyle} to="/users">users</Link>
          <form style={navBarStyle} onSubmit={handleLogout}>
              {authnuser.name} is logged in <button type='submit'>Logout</button>
          </form>

          <h2>blog app</h2>
          <Error />
          <Info />

          <Switch>
            <Route path="/users/:id">
              <User /> 
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Blogs />
          </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App