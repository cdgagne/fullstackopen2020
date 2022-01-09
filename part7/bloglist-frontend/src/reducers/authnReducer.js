import loginService from '../services/login'
import blogService from '../services/blogs'
import { createErrorNotification } from './notificationReducer'

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      dispatch({ type: 'LOGIN', data: user })
    } catch (error) {
      dispatch(createErrorNotification('Wrong username or password'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('bloglistUser')
    blogService.setToken(null)
    dispatch({ type: 'LOGOUT' })
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({ type: 'LOGIN', data: user })
  }
}

const authnReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default authnReducer