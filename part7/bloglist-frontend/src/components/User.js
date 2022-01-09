import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)

  const user = users.find(n => n.id === id)
  console.log('users', users)
  console.log('id', id)
  console.log('user', user)

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => <li>{blog.title}</li>)}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default User