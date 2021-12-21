import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right blog details', async () => {
  const mockCreateBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={mockCreateBlog} />
  )

  const authorInput = component.container.querySelector('#blogAuthor')
  const titleInput = component.container.querySelector('#blogTitle')
  const urlInput = component.container.querySelector('#blogUrl')
  const submitButton = component.container.querySelector('button')

  userEvent.type(authorInput, 'test author')
  userEvent.type(titleInput, 'test title')
  userEvent.type(urlInput, 'test url')

  fireEvent.click(submitButton)

  const expectedBlogObject = {
    author: 'test author',
    title: 'test title',
    url: 'test url'
  }

  expect(mockCreateBlog.mock.calls[0][0]).toStrictEqual(expectedBlogObject)
})