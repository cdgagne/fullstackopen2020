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
import { Form, Button, Nav, Navbar } from 'react-bootstrap'

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
      <Form id='login-form' onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id='login-button' type='submit'>Login</Button>
      </Form>
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
    return (
      <div className="container">
        <Login />
      </div>
    )
  } else {
    return (
      <div className="container">
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={navBarStyle} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={navBarStyle} to="/users">users</Link>
                </Nav.Link>
              </Nav>
                <form style={navBarStyle} onSubmit={handleLogout}>
                    {authnuser.name} is logged in <button type='submit'>Logout</button>
                </form>
            </Navbar.Collapse>
          </Navbar>

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
        </Router>
      </div>
    )
  }
}

export default App