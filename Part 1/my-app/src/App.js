import React from 'react'

/* Import components */
import Part from "./Components/Parts.js"
import Content from './Components/Content.js'
import Total from './Components/Total.js'
import Header from './Components/Header.js'


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App