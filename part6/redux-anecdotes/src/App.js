import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        .map(anecdote =>
          <div name="anecdote" key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
            </div>
          </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App