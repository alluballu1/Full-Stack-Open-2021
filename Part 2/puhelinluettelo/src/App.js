import React, { useState } from 'react'
import Names from './Components/Names'

const App = () => {


  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')

  const testFunct = (event) => {
    event.preventDefault()
    if(persons.findIndex(item => item.name === document.getElementById("test").value) === -1){
      setPersons([...persons, {name:document.getElementById("test").value}])
      setNewName("")
    }
    else{
      alert(document.getElementById("test").value + " is on the list already.")
    }
  }

  const inputValueChange = (item) => {
    setNewName(...item.target.name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={testFunct}>
        <div>
          name: <input type="text" value={newName} onChange={inputValueChange} id={"test"}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons}/>
    </div>
  )

}

export default App