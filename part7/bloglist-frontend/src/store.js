import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import blogFormReducer from './reducers/blogFormReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  blogs: blogReducer,
  blogForm: blogFormReducer,
  users: usersReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store