import { useEffect } from 'react'
import { useState } from 'react'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() =>{
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addNewPerson = (e) =>{

    e.preventDefault()

    const p = persons.find(p => p.name === newName)

    //Sin no existe se agrega
    if (!p){

      const newPerson = {name: newName, number: newNumber}

      personService
      .create(newPerson)
      .then(personAdded =>{
        setPersons(persons.concat(personAdded))

        setNotification({message: `${newPerson.name} was added succesfully`, type: 'success'})
        setTimeout(() => setNotification(null), 5000)

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

          setNotification({message: `The number of ${updatedPerson.name} was updated succesfully`, type: 'success'})
          setTimeout(() => setNotification(null), 5000)

          setNewName('')
          setNewNumber('')
          e.target.reset()
          })
          .catch(error => {
            setPersons(persons.filter(person => person.name !== newName))
            setNotification({message: `${newName} has been removed from the server (error: ${error})`, type: 'error'})
            setTimeout(() => setNotification(null), 5000)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification= {notification}/>

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
const Notification = ({notification}) => {


  if (!notification) {
    return null
  }

  const typeClassName = notification.type==='success' ? 'notification-success' : 'notification-error'

  return (

    <div className= {typeClassName}>
      {notification.message}
    </div>
  )
}

export default App