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
  return async (dispatch, getState) => {
    const state = getState()
    if (state.notification.id === id) {
      console.log('dismissing notification id', id)
      dispatch({
        type: 'DISMISS_NOTIFICATION',
        data: id
      })
    } else {
      console.log('not dismissing notification id', id)
    }
  }
}

const notificationReducer = (state = null, action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'DISMISS_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer