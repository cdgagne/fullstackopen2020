import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdotes[props.selected]}
    </div>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Votes = (props) =>
  <div>
    has {props.votes[props.selected]} votes
  </div>

const App = (props) => {
  const initVotes = new Array(props.anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)

  const handleNext = () => {
    const anecdote = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(anecdote)
  }

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Anecdote anecdotes={props.anecdotes} selected={selected}/>
      <Votes selected={selected} votes={votes} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNext} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'  
]

ReactDOM.render(<App anecdotes={anecdotes} />,
  document.getElementById('root')
);