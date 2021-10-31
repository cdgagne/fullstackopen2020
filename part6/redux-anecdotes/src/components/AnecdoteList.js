import React from 'react'
import Notification from './Notification'
import Filter from './Filter'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(createNotification(`you voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes
        .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteFor(anecdote)}>vote</button>
            </div>
          </div>
      )}

    </div>
  )
}

export default AnecdoteList