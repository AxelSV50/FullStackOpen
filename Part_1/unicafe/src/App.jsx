import { useState } from 'react'



const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    const handlerGood = () => setGood(good + 1)
    const handlerNeutral = () => setNeutral(neutral + 1)
    const handlerBad = () => setBad(bad + 1)   

    return (
      <div>
        <h1>Give feedback</h1>
        <Button onClick={handlerGood} text="good" />
        <Button onClick={handlerNeutral} text="neutral" />
        <Button onClick={handlerBad} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
  }

  const Statistics = ({good, neutral, bad}) => {

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

    if(total === 0){
        return (
            <>
              <h2>Statistics</h2>
              <p>No feedback given</p>
            </>
        )
    }else{
        return (
            <>
             <h2>Statistics</h2>
              <p>
                <StatisticLine text="Good: " value={good}/>
                <StatisticLine text="Bad: " value={bad}/>
                <StatisticLine text="Neutral: " value={neutral}/>
                <StatisticLine text="All: " value={total}/>
                <StatisticLine text="Average: " value={getAverage()}/>
                <StatisticLine text="Positive feedback: " value={getPositivePercent()}/>  
             </p>
           </>
        )
    }
  }

  const StatisticLine = ({text, value}) => {
      return (
          <div>
              <p>{text} {value}</p>
          </div>
      )
  }
  const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

export default App