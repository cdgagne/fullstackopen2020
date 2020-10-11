import React, { useState } from 'react'

const Numbers = ({ persons }) => 
  <div>
    <ul>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  </div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={handleAdd} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Numbers persons={persons}/>
    </div>
  )
}

export default App