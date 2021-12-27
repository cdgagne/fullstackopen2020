import React from 'react'
import { useSelector } from 'react-redux'

const Info = (props) => {
  const notifications = useSelector(state => state.notifications)
  const message = notifications.info ? notifications.info.message : null
  console.log('notifications:', notifications)
  if (message == null) {
    return null
  }
  return (
    <div className='info'>{message}</div>
  )
}

export default Info