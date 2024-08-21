import { useEffect, useState } from 'react'
import './App.css'
import countryService from './service/country'
import weatherService from './service/weather'

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
                <table border={1}>
                  <tbody>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                    <th>Country</th>
                    <th>View</th>
                    </tr>

                    <Country
                      name={countriesToShow[0].name.common}
                      capital={countriesToShow[0].capital}
                      area={countriesToShow[0].area}
                      languages={countriesToShow[0].languages}
                      flags={countriesToShow[0].flags}
                      capitalLatLon = {countriesToShow[0].capitalInfo}
                      view={true}
                    />
                  </tbody>
                </table>
              )
            :(
              <table border={1}>
                <tbody>
                  <tr style={{backgroundColor: '#f2f2f2'}}>
                  <th>Country</th>
                  <th>View</th>
                  </tr>
                  
                  {countriesToShow.map((c) => (
                    <Country 
                          key={c.ccn3}
                          name={c.name.common}
                          capital={c.capital}
                          area={c.area}
                          languages={c.languages}
                          flags={c.flags}
                          capitalLatLon = {c.capitalInfo}
                          view={false}
                    />
                 ))}
                </tbody>

              </table>
              
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

const Country = ({name, capital, area, languages, flags, view, capitalLatLon}) =>{

  const [showView, setShowView] = useState(view)

  return(
    <tr>
      {showView ? 
      <>
        <td style={{width: '600px', backgroundColor: '#DAF7A6'}}>
          <CountryView
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flags={flags}
            capitalLatLon = {capitalLatLon}
          /> 
        </td>

        <td style={{textAlign: 'center'}}>
           <button onClick={() => setShowView(false)}>Hide</button> 
        </td>
      </>
      :
      <>
        <td style={{width: '600px'}}>
          {name}
        </td>
        <td style={{textAlign: 'center'}}>
           <button onClick={() => setShowView(true)}>Show</button> 
        </td>
      </>

      }
    </tr>
  )
}
const CountryView = ({name, capital, area, languages, flags, capitalLatLon}) =>{

  const [wInfo, setWInfo] = useState(null)

  useEffect(() =>{
    
    weatherService
    .getWeather(capitalLatLon.latlng[0], capitalLatLon.latlng[1])
    .then(data => {

      return setWInfo(data)
    })

  }, [])

  return(
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>

      <h2>Languages</h2>
      <ul>{Object.values(languages).map((l, k)=><li key = {k}>{l}</li>)}</ul>

      <img src = {flags.png} alt = 'country flag'></img>
      <h2>Weather in {capital[0]}</h2>

      {!wInfo ?
        <p>Not available</p>
      :
      <>
        <p>Temperature: {wInfo.temp}° K</p>
        <img src={wInfo.icon} alt = 'weather icon'/>
        <p>
          Description: {wInfo.des} <br/>
          Wind Speed: {wInfo.wind} m/s 
        </p>
      </>

      }

    </div>
  )
}
export default App
