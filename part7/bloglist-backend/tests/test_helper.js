const Blog = require('../models/blogs')
const User = require('../models/users')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const initialUser = {
  username: 'testuser',
  name: 'a test user',
  password: 'password',
}

const initBlogs = async () => {
  const userInDb = await User.findOne({})
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: userInDb._id })
  )
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}

const initUsers = async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(initialUser)
}

const login = async (username, password) => {
  const user = {
    username: username,
    password: password,
  }
  const response = await api.post('/api/login').send(user)
  return response.body.token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initBlogs,
  blogsInDb,
  initUsers,
  login,
  usersInDb,
}
