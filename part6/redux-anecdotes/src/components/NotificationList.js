import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const NotificationList = () => {
  const notifications = useSelector(state => state.notifications)
  return (
    <div>
      {notifications.map(notification => <Notification key={notification.id} notification={notification} />)}
    </div>
  )
}

export default NotificationList