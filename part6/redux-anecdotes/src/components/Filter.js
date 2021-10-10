import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = (props) => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const setFilter = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    dispatch(filterChange(filterValue))
  }

  return (
    <div style={style}>filter <input name="filter" onChange={setFilter} /></div>
  )
}

export default Filter