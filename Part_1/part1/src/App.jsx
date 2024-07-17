import { useState } from 'react'

//Función de flecha para retornar el componente
const App = () => {

  const now = new Date();
  const a = 10;
  const b = 20;
  const name = "Axel"
  console.log('Hello folks!: ', a, b, a+b);

  return (
    <div>
      <Hello name="Cristian" age={26} />
      <Hello name={name} age= {26-2}/>
      <p> <br/> it's {now.toString()}</p>
    </div>
  )
}
const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p><strong> Hello </strong> my friend {props.name} <br/>
      You are {props.age} years old</p>
    </div>
  )
}
export default App
