import { useState, useEffect } from 'react'
import axios from 'axios'
import nameService from './services/names'

const Name = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map(person => 
        <Name key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState('a new number...')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
    }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: newName,
      number: newNumber,
    }

    var names = persons.map(function(name) {return name.name})
    var checkName = newName
    if ((names.includes(checkName)) === true) {window.alert(`${newName} is already added to phonebook`
    )} 
    else {
      nameService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')  })
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
      <form onSubmit={addName}>
        name: <input 
          value={newName} 
          onChange={handleNameChange}
        />
      </form>
      <form onSubmit={addName}>
        number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
        />
        <br></br>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App