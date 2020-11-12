/**
 * Full stack open 2020
 * Exercises 2.6 - 2.18 Phonebook
 */
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = ({ person, handleDelete }) => <li>{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button></li>

const Persons = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)}
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
  return (
    <form>
      <div>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button onClick={handleSubmit} type="submit">add</button></div>
      </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message == null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message == null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const hook = () => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }
  useEffect(hook, [])

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const existingPerson = persons.find(person => person.name === newPerson.name)
    if (existingPerson === undefined) {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    } else {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            setErrorMessage(`Information of ${existingPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
        }
    }
  }

  const handleDelete = (personToDelete) => {
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete)
        .then(response => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setNotificationMessage(`Removed ${personToDelete.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleAdd} />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App