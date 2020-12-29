const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blogs')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

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

test('a valid blog can be added', async () => {
    const blog = {
        title: 'Python creator Guido van Rossum joins Microsoft',
        author: 'Frederic Lardinois',
        url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/',
        likes: 48,
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blog.title)
})

test('if a blog added is missing the likes property it will default to 0', async () => {
    const blog = {
        title: 'Python creator Guido van Rossum joins Microsoft',
        author: 'Frederic Lardinois',
        url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/'
    }

    await api
        .post('/api/blogs')
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
        url: 'https://techcrunch.com/2020/11/12/python-creator-guido-van-rossum-joins-microsoft/'
    }

    let blogWithoutTitle = blog
    delete blogWithoutTitle.title

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    let blogWithoutUrl = blog
    delete blogWithoutUrl.url

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})