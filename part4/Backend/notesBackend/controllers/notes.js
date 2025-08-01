const notesRouter = require('express').Router()
const Note = require('../model/note')
const User = require('../model/user')
const jwt = require('jsonwebtoken')


notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const notes = await Note.findById(request.params.id)
  if (notes) {
    response.json(notes)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken)

  if (!user) {
    return response.status(400).json({ error: `userId missing or not valid` })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  const notes = await Note.findById(request.params.id)
      if (!notes) {
        return response.status(404).end()
      }

      notes.content = content
      notes.important = important

      const res = await notes.save()
      return response.json(res)
})

module.exports = notesRouter