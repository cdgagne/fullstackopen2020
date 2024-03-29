const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blogs')

beforeEach(async () => {
  await helper.initUsers()
  await helper.initBlogs()
})

describe('viewing a blog', () => {
  test('the correct number of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog has a unique identifier named id', async () => {
    const blogs = await helper.blogsInDb()

    expect(blogs[0].id).toBeDefined()
  })
})

describe('adding a blog', () => {
  test('a valid blog is not added when not logged in', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blog = {
      title: 'Python creator Guido van Rossum joins Microsoft',
      author: 'Frederic Lardinois',
      url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/',
      likes: 48,
    }

    // Call the API w/o the Authorization header
    await api.post('/api/blogs').send(blog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })

  test('a valid blog can be added when logged in', async () => {
    const blog = {
      title: 'Python creator Guido van Rossum joins Microsoft',
      author: 'Frederic Lardinois',
      url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/',
      likes: 48,
    }

    const token = await helper.login('testuser', 'password')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(blog.title)
  })

  test('if a blog added is missing the likes property it will default to 0', async () => {
    const blog = {
      title: 'Python creator Guido van Rossum joins Microsoft',
      author: 'Frederic Lardinois',
      url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/',
    }

    const token = await helper.login('testuser', 'password')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const addedBlogs = await Blog.find({ title: blog.title })
    expect(addedBlogs[0].likes).toEqual(0)
  })

  test('if a blog added is missing the title or url the HTTP status code will be 400 Bad Request', async () => {
    const blog = {
      title: 'Python creator Guido van Rossum joins Microsoft',
      author: 'Frederic Lardinois',
      url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/',
    }

    let blogWithoutTitle = blog
    delete blogWithoutTitle.title

    const token = await helper.login('testuser', 'password')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    let blogWithoutUrl = blog
    delete blogWithoutUrl.url

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deleting a blog', () => {
  test('delete a blog entry with a valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    const token = await helper.login('testuser', 'password')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    const blogIds = blogsAfterDelete.map((b) => b.id)
    expect(blogIds).not.toContain(blogToDelete.id)
  })
})

describe('updating a blog', () => {
  test('update a blog entry with a valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    const newBlogEntry = {
      title: 'An updated blog',
      author: 'Joey Jo Jo Junior Shabadoo',
      url: 'http://www.asdf.com',
      likes: 123,
    }

    const token = await helper.login('testuser', 'password')

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogEntry)
      .expect(200)

    const blogAfterUpdate = await Blog.findById(blogToUpdate.id)
    expect(blogAfterUpdate.title).toEqual(newBlogEntry.title)
    expect(blogAfterUpdate.author).toEqual(newBlogEntry.author)
    expect(blogAfterUpdate.url).toEqual(newBlogEntry.url)
    expect(blogAfterUpdate.likes).toEqual(newBlogEntry.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
