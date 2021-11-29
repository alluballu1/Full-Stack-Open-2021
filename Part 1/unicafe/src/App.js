import React, { useState } from 'react'

import Statistics from './Components/Statistics'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good+1)}>Good</button>
        <button onClick={() => setNeutral(neutral+1)} >Neutral</button>
        <button onClick={() => setBad(bad+1)}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App