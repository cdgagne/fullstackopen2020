const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const User = require('../models/users')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('viewing users', () => {
  test('the correct number of users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(1)
  })
})

describe('creating users', () => {
  test('a user is created when valid json is passed in request', async () => {
    const user = {
      username: 'user',
      name: 'user mcuser',
      password: 'mypassword',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    const usernames = users.map((u) => u.username)
    expect(usernames).toContain('user')
  })

  test('an error when a username is missing', async () => {
    const user = {
      name: 'user mcuser',
      password: 'mypassword',
    }

    const response = await api.post('/api/users').send(user).expect(400)

    expect(response.body.error).toContain('`username` is required')
  })

  test('an error when a password is less than 3 characters', async () => {
    const user = {
      username: 'user',
      name: 'user mcuser',
      password: 'pw',
    }

    const response = await api.post('/api/users').send(user).expect(400)

    expect(response.body.error).toContain(
      'password must be at least 3 characters'
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
