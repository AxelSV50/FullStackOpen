import { useState } from 'react'



const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    const handlerGood = () => setGood(good + 1)
    const handlerNeutral = () => setNeutral(neutral + 1)
    const handlerBad = () => setBad(bad + 1)

    const total = good+bad+neutral
    const getAverage = () => {
        if (total === 0) {
            return 0 
        }else{
            return (good+bad*-1)/total
        }
    }
    const getPositivePercent = () => {

      if (total === 0) {
        return 0 + "%"
      }else{
        return ((good/total)*100) + " %"
      }
    }

    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={handlerGood}>good</button>
        <button onClick={handlerNeutral}>neutral</button>
        <button onClick={handlerBad}>bad</button>
        <h2>Statistics</h2>
        <p>
            Good: {good} <br/>
            Neutral: {neutral} <br/>
            Bad: {bad} <br/>
            All: {total} <br/>
            Average: {getAverage()} <br/>
            Positive feedback: {getPositivePercent()}
        </p>

      </div>
    )
  }

export default App