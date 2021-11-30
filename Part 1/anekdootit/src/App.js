import React, { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  /* constants */

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)
  const [currentAnecdotePoints, setCurrentAnecdotePoints] = useState(points[0])
  const [max, setMax] = useState(0)

  /* Button functions */

  const voteFunct = () => {
    points[selected] += 1
    setPoints([...points])
    setCurrentAnecdotePoints(points[selected])
  }

  const nextFunct = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
    setCurrentAnecdotePoints(points[randomNum])
  }

  /* Update the max points value when voteFunction is called */

  useEffect(() => {
    setMax(points.reduce(function (a, b) {
      return Math.max(a, b)
    }))
  }, [voteFunct])


  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <p />
      has {currentAnecdotePoints} points
      <p />
      <button onClick={() => voteFunct()} >Vote</button>
      <button onClick={() => nextFunct()}>Next anecdote</button>
      <p />
      <h1>
        Anecdote with most votes
      </h1>
      {anecdotes[points.indexOf(max)]}
      <p />
      has {max} points
    </div>
  )
}

export default App