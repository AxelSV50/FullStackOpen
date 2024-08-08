import { useEffect } from 'react'
import { useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  useEffect(() =>{
    personService.getAll().then(persons => setPersons(persons))
  }, [])
  const addNewPerson = (e) =>{

    e.preventDefault()

    const p = persons.find(p => p.name === newName)

    if (!p){

      const newPerson = {name: newName, number: newNumber}

      personService
      .create(newPerson)
      .then(personAdded =>{
        setPersons(persons.concat(personAdded))
        setNewName('')
        setNewNumber('')
        e.target.reset()
      })
      .catch(error =>{
        alert(`Error: ${error}`)
      }     
    )
    }else{

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const updatedPerson = {name: newName, number: newNumber, id:p.id}
        personService
        .update(p.id, updatedPerson)
        .then(() => {

          setPersons(persons.map(value =>value.id === p.id ? updatedPerson: value))
          setNewName('')
          setNewNumber('')
          e.target.reset()

          })
      }
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

  const deletePerson = (p) =>{

    console.log(p.name, " ",p.id)

    if (window.confirm(`Do you really want to delete ${p.name}?`)) {
      personService
      .deleteByID(p.id)
      .then((personDeleted) => {
        setPersons(persons.filter((person)=> person.id !== p.id))
        alert(`${personDeleted.name} has been deleted succesfully...`)
      })
      .catch((error) => {
        if(error.response.status===404){
          alert("Error: Source Not found")
        }
      })
    }
  }
  const personsToShow = 
  !nameSearch ? persons : persons.filter(p => searchName(p.name))

  console.log(personsToShow)
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
        handleAddName={addNewPerson}
      />

     <Persons handleDelete = {deletePerson} personsToShow={personsToShow}/>
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

const Persons = ({personsToShow, handleDelete}) =>{

  return(
    <> 
    <h2>Numbers</h2>
      {personsToShow.map((p, index) => 
      <Person key= {index}
        id = {p.id}
        name={p.name} 
        number={p.number}
        handleDelete={handleDelete}/>
      )}

    </>
  )
}

const Person = ({ name, number, id, handleDelete}) => {

  return(
    <div style={{display: 'flex', flexFlow: 'row', columnGap: '10px'}}>
      <p >{name} {number}</p>
      <button onClick={() => handleDelete({name, id})}
      style={{backgroundColor: 'red', color: 'white', height:'30px'}}>Delete</button>
    </div>
  )
}
export default App