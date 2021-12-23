import React from 'react'
import { useSelector } from 'react-redux'

const Error = (props) => {
  const notifications = useSelector((state) => state)
  const message = notifications.error ? notifications.error.message : null
  if (message == null) {
    return null
  }
  return <div className="error">{message}</div>
}

export default Error
