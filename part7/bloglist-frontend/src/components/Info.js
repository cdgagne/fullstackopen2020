import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Info = (props) => {
  const notifications = useSelector(state => state.notifications)
  const message = notifications.info ? notifications.info.message : null
  if (message == null) {
    return null
  }
  return (
    <Alert className='success'>{message}</Alert>
  )
}

export default Info