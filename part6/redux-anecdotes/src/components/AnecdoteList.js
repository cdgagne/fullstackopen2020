import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      {anecdotes
        .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
            </div>
          </div>
      )}

    </div>
  )
}

export default AnecdoteList