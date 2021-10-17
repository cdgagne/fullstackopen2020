const getId = () => (100000 * Math.random()).toFixed(0)

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes, 
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
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