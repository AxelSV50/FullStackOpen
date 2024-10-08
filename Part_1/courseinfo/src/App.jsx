
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total numExercises = {course.parts.map(value => value.exercises)} />
    </div>
  )
}

//First component
const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

//Second component
const Content = (props) => {

  return (
    <>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </>
  )
}

//Third component
const Total = (props) => {

  return (
    <>
      <p>Number of exercises { 
         sumPropsArray(props.numExercises)
      }
      </p>
    </>
  )
}

//Fourth component
const Part = (props) => {

  return(
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
} 
export default App

function sumPropsArray (numExercises){
  var sum= 0

  numExercises.forEach(element => {
    sum+=element;
  });
  return sum
 }