import React, { useState } from 'react'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

const Filter = ({ handleChange }) => {
  return (
    <div>filter shown with <input onChange={handleChange} /></div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return(
    <form>
      <div>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button onClick={handleSubmit} type="submit">add</button></div>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    const notFound = (persons.find(person => person.name === newName) === undefined)
    if (notFound) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleAdd} />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App