import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr><th>name</th><th>blogs created</th></tr>
        </thead>
        <tbody>
          {users.map(user => (<tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users