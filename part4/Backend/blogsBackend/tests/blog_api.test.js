const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../model/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  console.log('done')
})

test('all blogs are returned', async () => {
  console.log('Entered Test')
  const response = await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)


  assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('unique identifier is named id', async () => {
  console.log('Entered Test')
  const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        // .expect(response.body[0].id)
        // .expect(response.body[0]._id).toBeUnDefined()
        // .expect(typeof response.body[0].id).toBe('string')
  assert.ok(response.body[0].id, 'id should be defined')
  assert.strictEqual(response.body[0]._id, undefined)
  console.log(response.body[0].id)
})

test('adding to the blog list', async () => {
  const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length + 1)

  const title = blogsAtEnd.map(b => b.title)
  assert(title.includes('First class tests'))
})

describe('Deleting and updating a blog post', () => {
  test.only('Successfully deleting a valid blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    
    const title = blogsAtEnd.map(b => b.title)
    assert(!title.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
  })

  test.only('Updating the fields in the blog', async () => {
    const blogToStart = await helper.blogsInDb()
    const blogToUpdate = blogToStart[0]

    const newBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns is totally fun to learn",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8,
      __v: 0
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const title = blogsAtEnd.map(b => b.title)
    assert(title.includes('React patterns is totally fun to learn'))
  })
})

after(async () => {
  await mongoose.connection.close()
})