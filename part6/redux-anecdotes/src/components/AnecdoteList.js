import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, dismissNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(createNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(dismissNotification())
    }, 5000)
  }

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
              <button onClick={() => voteFor(anecdote)}>vote</button>
            </div>
          </div>
      )}

    </div>
  )
}

export default AnecdoteList