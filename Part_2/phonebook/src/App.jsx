import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Armando Perro', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  const handleAddName = (e) =>{

    e.preventDefault()

    if (!persons.find(p => p.name === newName)){

      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
      e.target.reset()

    }else{
      alert(`${newName} is already added to phonebook`);
    }

  }
  const searchName = (name) =>{

    const lcName = name.toLowerCase()
    const lcSearched = nameSearch.toLowerCase()

    for (let i = 0; i<nameSearch.length; i++){

      if(!(lcName.charAt(i)===lcSearched.charAt(i))){

        return false
      }
    }
    return true
  }

  const personsToShow = 
  !nameSearch ? persons : persons.filter(p => searchName(p.name))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNameSearch={setNameSearch} nameSearch={nameSearch}/>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName} 
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleAddName={handleAddName}
      />

     <Persons personsToShow={personsToShow}/>
    </div>
  )
}

const Filter = ({setNameSearch, nameSearch}) =>{

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Search: <input value = {nameSearch} onChange={(e) => setNameSearch(e.target.value)}/>
    </form>
  )
}
const PersonForm = ({newName, newNumber, setNewName, setNewNumber, handleAddName}) =>{
  return(
    <form onSubmit={handleAddName}>
        <div>
          name: <input value = {newName} onChange={(e) => setNewName(e.target.value)}/>
          <br/>
          number: <input value = {newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({personsToShow}) =>{
  return(
    <> 
    <h2>Numbers</h2>
      {personsToShow.map((p, index) => 
      <Person key= {index}
        name={p.name} 
        number={p.number}/>
      )}
    </>
  )
}

const Person = ({index, name, number}) => {
  return(
    <p >{name} {number}</p>
  )
}
export default App