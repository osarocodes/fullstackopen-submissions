const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(n => n.id === id)

  if (!person) {
    res.status(404).end()
  } else {
    res.json(person)
  }
})

app.get('/info', (req, res) => {
  const info = persons.length;
  const currentTime = new Date();

  res.send(`
    <p>Phonebook has info for ${info} people</p>
    <p>${currentTime}</p>
    `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(n => n.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons/', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing"
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  if (persons.some(p => p.name.toLowerCase() === person.name.toLowerCase())) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  console.log('Request body: ', req.body)
  persons = persons.concat(person)
  res.json(person)

})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => console.log("Server running on Port", PORT))