import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes, 
    })
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteForVote = state.find(n => n.id === id)
      const anecdoteWithVote = {
        ...anecdoteForVote,
        votes: anecdoteForVote.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? anecdoteWithVote : anecdote)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    default:
      return state
  }
}

export default anecdoteReducer