const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>Number of exercises: {sum}</strong> </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}

  </>

const Course = ({course}) =>{

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return(
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={total}/>
    </>
  )
}

export default Course