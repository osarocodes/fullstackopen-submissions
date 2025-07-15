const express = require('express')
const app = express()
const cors = require('cors')


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

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  
  notes = notes.concat(note)

  console.log(note)
  res.json(note)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World! I am coming to conquer you</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server running on port", PORT))