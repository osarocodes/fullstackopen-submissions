const Note = require('./model/note')
const express = require('express')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const app = express()


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
morgan.token('body', (req) => JSON.stringify(req.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  note.save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World! I am coming to conquer you</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.delete('api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then(updatedNote => {
        res.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint =(req, res) => {
  res.status(404).send({ error: "unknown Endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: "Malformatted id" })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
} 

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server running on port", PORT))