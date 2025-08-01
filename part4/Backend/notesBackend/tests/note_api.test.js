const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Note = require('../model/note')
// const { initialNotes } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  for(let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
  console.log('done')
})

test('all notes are returned', async () => {
  console.log('entered test')
  const response = await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)


  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Testing is fun',
    important: false
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const noteAtEnd = await Note.find({})
  assert.strictEqual(noteAtEnd.length, helper.initialNotes.length + 1)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]


  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]


  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(n => n.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})