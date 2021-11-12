import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  const setFilter = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    props.filterChange(filterValue)
  }

  return (
    <div style={style}>filter <input name="filter" onChange={setFilter} /></div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter