import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Error = (props) => {
  const notifications = useSelector((state) => state.notifications)
  const message = notifications.error ? notifications.error.message : null
  if (message == null) {
    return null
  }
  return <Alert variant="danger">{message}</Alert>
}

export default Error
