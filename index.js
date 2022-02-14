require('dotenv').config()
const express = require('express')
const app = express()
const Name = require('./models/name')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

//const url =
//  `mongodb+srv://puhluet:Paluu.Pulpettiin1979@cluster0.2wtbn.mongodb.net/puhluetteloDatabase?retryWrites=true&w=majority`

//mongoose.connect(url)

const nameSchema = new mongoose.Schema({
  name: String,
  number: String
})

nameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Name = mongoose.model('Name', nameSchema)

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  }
]
//TTTTTTTTTTTEEEEEEEEEEEEEEEEESSSSSSSSSSSSSTTTTTTTTTTTT
app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>')
})


const generateId = () => {
  min = 10
  max= 1000000000
  return Math.random() * (max - min) + min
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  var names = []
  for (var i = 0; i < persons.length; i++) {
    names.push(persons[i].name)
  }

  if (names.includes(body.name)) {
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


app.get('/info', (req,res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (request, response) => {
  Name.find({}).then(person => {
    response.json(person)
  })
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})