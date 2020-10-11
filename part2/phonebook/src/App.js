import React, { useState } from 'react'

const Numbers = ({ persons }) => 
  <div>
    <ul>
      {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  </div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <div><button onClick={handleAdd} type="submit">add</button></div>
        </div>
      </form>
      <h2>Numbers</h2>
        <Numbers persons={persons}/>
    </div>
  )
}

export default App