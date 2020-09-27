import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => <li>{props.text} {props.value}</li>

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good + props.bad*-1) / (props.good + props.neutral + props.bad)
  const positive = props.good / (props.good + props.neutral + props.bad) * 100 + "%"

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
          <h2>Statistics</h2>
          <ul>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
          </ul>
      </div>
    )
  }
}

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
      <Feedback handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);