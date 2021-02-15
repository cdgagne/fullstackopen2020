import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const user = {
  id: 123,
  name: 'testy testerson',
}

const blog = {
  title: 'my blog title',
  author: 'my blog author',
  url: 'https://my-blog-url',
  likes: 22,
  user: user,
}

const mockUpdateBlog = jest.fn()
const mockRemoveBlog = jest.fn()

test('<Blog /> renders a blog title and author, but not the url or number of likes by default', () => {
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />
  )

  const blogTitleAndAuthorDiv = component.container.querySelector('.blogTitleAndAuthor')
  expect(blogTitleAndAuthorDiv).toBeVisible()
  const blogDetailsDiv = component.container.querySelector('.blogDetails')
  expect(blogDetailsDiv).not.toBeVisible()
})

test('<Blog /> url and number of likes are shown when the view button is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />
  )

  const blogDetailsDiv = component.container.querySelector('.blogDetails')

  // Initially not visible
  expect(blogDetailsDiv).not.toBeVisible()

  // Click the view button
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  // Now visible
  expect(blogDetailsDiv).toBeVisible()
})