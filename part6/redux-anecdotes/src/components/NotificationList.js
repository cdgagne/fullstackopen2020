import React from 'react'
import { connect } from 'react-redux'

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

const NotificationList = (props) => {
  return (
    <div>
      {props.notifications.map(notification => <Notification key={notification.id} notification={notification} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notifications: state.notifications }
}

const ConnectedNotificationList = connect(mapStateToProps)(NotificationList)
export default ConnectedNotificationList