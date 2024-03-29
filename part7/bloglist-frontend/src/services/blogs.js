import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization:token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.put(blogUrl, blog)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization:token },
  }
  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.delete(blogUrl, config)
  return response.data
}

const addComment = async (blog, newComment) => {
  const config = {
    headers: { Authorization:token },
  }
  const body = {
    "text": newComment
  }
  const blogUrl = `${baseUrl}/${blog.id}/comments`
  const response = await axios.post(blogUrl, body, config)
  return response.data
}

export default { setToken, getAll, create, update, remove, addComment}