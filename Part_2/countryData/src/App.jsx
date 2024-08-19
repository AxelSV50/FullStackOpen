import { useEffect, useState } from 'react'
import './App.css'
import countryService from './service/country'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setcountriesToShow] = useState([])

  useEffect(() =>{
    
    countryService
    .getAll()
    .then(data => setCountries(data))

  }, [])

  const searchCountriesHandler = (event) =>{

    event.preventDefault()

    const value = event.target.value

    if(value){
      const countriesFounded = countries.filter(c => compareNames(c.name.common, event.target.value))
      setcountriesToShow(countriesFounded ? countriesFounded : [])
    }else{
      setcountriesToShow([])
    }

  }

  const compareNames = (name1, name2) =>{

    name1 = name1.toUpperCase()
    name2 = name2.toUpperCase()

    for(let i = 0; i<name2.length; i++){
      if(!(name1.charAt(i) === name2.charAt(i))){
         return false
      }
    }
    return true
  }

  //JSX
  return (
    <>
      <div>

        <form>
        Find countries: <input type="text" onChange={(e) => searchCountriesHandler(e)} />
        </form>

        {countriesToShow.length > 0 ? (
          countriesToShow.length < 10 ? (

              countriesToShow.length === 1 ? (
                <CountryDetails
                  name={countriesToShow[0].name}
                  capital={countriesToShow[0].capital}
                  area={countriesToShow[0].area}
                  languages={countriesToShow[0].languages}
                  flags={countriesToShow[0].flags}
                 />
              )
            :(
              countriesToShow.map((c) => (
                <Country key={c.ccn3} name={c.name.common} />
              ))
            )
   
          ) : (
            <p>Too many matches, specify another filter</p>
          )
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </>
  )
}

const Country = ({name}) =>{

  return(
    <div>
      <p>{name}</p>
    </div>
  )
}
const CountryDetails = ({name, capital, area, languages, flags}) =>{


  return(
    <div>
      <h1>{name.common}</h1>
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>
      <h2>Languages</h2>
      <ul>{Object.values(languages).map((l, k)=><li key = {k}>{l}</li>)}</ul>
      <img src = {flags.png} alt = 'country flag'></img>
    </div>
  )
}
export default App
