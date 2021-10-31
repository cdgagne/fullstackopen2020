const randomId = () => {
  return Math.floor(Math.random() * 1000000)
}

export const createNotification = (content, timeoutSeconds) => {
  const newNotificationId = randomId()
  return async (dispatch, getState) => {
    const notification = {
      id: newNotificationId,
      message: content
    }

    setTimeout(() => {
      dispatch(dismissNotification(newNotificationId))
    }, timeoutSeconds * 1000)

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: notification
    })
  }
}

export const dismissNotification = (id) => {
  return {
    type: 'DISMISS_NOTIFICATION',
    data: id
  }
}

const notificationReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return [...state, action.data]
    case 'DISMISS_NOTIFICATION':
      return state.filter(notification => notification.id !== action.data)
    default:
      return state
  }
}

export default notificationReducer