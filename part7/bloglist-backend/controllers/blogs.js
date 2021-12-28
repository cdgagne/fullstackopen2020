const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const middleware = require('../utils/middleware')
const auth = require('../utils/auth')

blogsRouter.use(middleware.tokenHandler)

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  console.log('blogs', blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await auth.getUserFromToken(request.token)
  if (!user) {
    return response.status(401).json({ error: 'invalid or missing token' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1
  }, (err, savedBlogWithUser) => {
    console.log('savedBlogWithUser', savedBlogWithUser)
    response.status(201).json(savedBlogWithUser)
  })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const user = await auth.getUserFromToken(request.token)
  if (!user) {
    return response.status(401).json({ error: 'invalid or missing token' })
  }

  // Validate that the user requesting the deletion of the blog entry
  // is the user that created it
  const blog = await Blog.findById(request.params.id)
  if (!blog.user.equals(user._id)) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  // Remove the blog from the list of blogs in the user object
  // before removing the blog object
  const userBlogs = user.blogs.filter((b) => !b._id.equals(blog._id))
  user.blogs = userBlogs
  await user.save()

  // Remove the blog object
  await Blog.findByIdAndDelete(blog._id)

  response.status(204).json(blog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(result)
})

module.exports = blogsRouter
