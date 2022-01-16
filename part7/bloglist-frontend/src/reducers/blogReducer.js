import blogService from '../services/blogs'
import { createErrorNotification, createInfoNotification } from './notificationReducer'

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog)
      dispatch(createInfoNotification(`A new blog '${blog.title}' by ${blog.author} added`))
      dispatch({ type: 'ADD_BLOG', data: response })
    } catch (error) {
      dispatch(createErrorNotification(error.response.data.error))
      throw(error)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const response = await blogService.update(likedBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: response
      })
    } catch (error) {
      console.log('Error liking blog:', error)
      dispatch(createErrorNotification('Error liking blog'))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog)
      const response = await blogService.getAll()
      dispatch({
        type: 'SET_BLOGS',
        data: response
      })
    } catch (error) {
      console.log('Error removing blog:', error)
      dispatch(createErrorNotification('Error removing blog'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addComment(blog, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data: response
      })
    } catch (error) {
      console.log('Error adding comment to blog:', error)
      dispatch(createErrorNotification('Error adding comment to blog'))
    }
  }
}

const blogReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
    case 'SET_BLOGS':
      return sortBlogs(action.data)
    case 'ADD_BLOG':
      return sortBlogs(state.concat(action.data))
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    default:
      return state
  }
}

export default blogReducer