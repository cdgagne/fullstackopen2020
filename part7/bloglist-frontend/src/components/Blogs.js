import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <BlogForm />

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td>{blog.author}</td><td>{blog.likes}</td>
              <td>{blog.user ? blog.user.username : 'anonymous'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs