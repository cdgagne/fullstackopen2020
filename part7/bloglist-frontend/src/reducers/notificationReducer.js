const randomId = () => {
  return Math.floor(Math.random() * 1000000)
}

export const createInfoNotification = (message) => {
  const newNotificationId = 'info-' + randomId()
  return async (dispatch, getState) => {
    const notification = {
      id: newNotificationId,
      message
    }

    setTimeout(() => {
      dispatch(dismissInfoNotification(newNotificationId))
    }, 5 * 1000)

    dispatch({
      type: 'NEW_INFO_NOTIFICATION',
      data: notification
    })
  }
}

export const createErrorNotification = (message) => {
  const newNotificationId = 'error-' + randomId()
  return async (dispatch, getState) => {
    const notification = {
      id: newNotificationId,
      message
    }

    setTimeout(() => {
      dispatch(dismissErrorNotification(newNotificationId))
    }, 5 * 1000)

    dispatch({
      type: 'NEW_ERROR_NOTIFICATION',
      data: notification
    })
  }
}

export const dismissInfoNotification = (id) => {
  return async(dispatch, getState) => {
    const state = getState()
    if (state.notifications.info.id === id) {
      dispatch({
        type: 'DISMISS_INFO_NOTIFICATION',
        data: id
      })
    } // if no match, the notification has already been replaced
  }
}

export const dismissErrorNotification = (id) => {
  return async(dispatch, getState) => {
    const state = getState()
    if (state.notifications.error.id === id) {
      dispatch({
        type: 'DISMISS_ERROR_NOTIFICATION',
        data: id
      })
    } // if no match, the notification has already been replaced
  }
}

const notificationReducer = (state = {error: null, info: null}, action) => {
  console.log('ACTION:', action)
  switch(action.type) {
    case 'NEW_ERROR_NOTIFICATION':
      const errorstate = {
        error: action.data,
        info: state.info
      }
      return errorstate 
    case 'NEW_INFO_NOTIFICATION':
      const infostate = {
        info: action.data,
        error: state.error
      }
      return infostate
    case 'DISMISS_INFO_NOTIFICATION':
      return { info: null, error: state.error }
    case 'DISMISS_ERROR_NOTIFICATION':
      return { info: state.info, error: null }
    default:
      return state
  }
}

export default notificationReducer