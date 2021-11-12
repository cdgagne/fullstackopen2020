import React from 'react'
import Notification from './Notification'
import Filter from './Filter'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const voteFor = (anecdote) => {
    props.addVote(anecdote)
    props.createNotification(`you voted for '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {props.anecdotes
        .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        .filter(anecdote => anecdote.content.toLowerCase().includes(props.filter))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  createNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList