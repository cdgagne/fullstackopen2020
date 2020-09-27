import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => (
  <div>
    <ul>
      <h2>Statistics</h2>
      <li>good {props.good}</li>
      <li>neutral {props.neutral}</li>
      <li>bad {props.bad}</li>
    </ul>
  </div>
)

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Feedback = (props) => (
  <div>
    <h2>Give Feedback</h2>
    <Button onClick={props.handleGood} text="good" />
    <Button onClick={props.handleNeutral} text="neutral" />
    <Button onClick={props.handleBad} text="bad" />
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral +1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h2></h2>
      <Feedback handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);