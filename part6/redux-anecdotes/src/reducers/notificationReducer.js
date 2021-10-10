const notificationReducer = (state = null, action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.content
    case 'DISMISS_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    content
  }
}

export const dismissNotification = () => {
  return {
    type: 'DISMISS_NOTIFICATION'
  }
}

export default notificationReducer