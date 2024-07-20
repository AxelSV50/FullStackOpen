import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'Another anecdote to test.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(value => 0))


  const handlerNextAnec = () => setSelected(parseInt(Math.random()*anecdotes.length))
  const handlerVoteAnec = () =>{
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {points[selected]} votes <br/>
      <button onClick={handlerVoteAnec}>Vote</button>
      <button onClick={handlerNextAnec}>Next anecdote</button>
      <MostVotedAnecdote anecdotes={anecdotes} points={points}/>
    </div>
  )
}
const MostVotedAnecdote = ({anecdotes, points}) =>{

  const getMostVotedAnec = () =>{
   
    let index = 0
    let previousValue = points[index]
    let currentMax = previousValue;

    if(anecdotes.length>1){

      for (let i = 1; i < anecdotes.length; i++){

        if(points[i]>currentMax){
          currentMax = points[i]
          index = i;
        }
        previousValue = points[i]
      }
    }
    return anecdotes[index]+ " Has "+ currentMax+ " votes"
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {getMostVotedAnec()}
    </div>
  )
}

export default App