const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Name = require('./models/name')

const url = 'mongodb+srv://puhluet:Paluu.Pulpettiin1979@cluster0.2wtbn.mongodb.net/puhluetteloDatabase?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const nameSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//const Name = mongoose.model('Name', nameSchema)

/*let persons = [
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
]*/

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

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const name = new Name({
    name: body.name,
    number: body.number,
  })

  name.save().then(savedName => {
    response.json(savedName)
  })
})

app.get('/info', (req,res) => {
  res.send(`<p>Phonebook has info for ${names.length} people.</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
  res.json(people)
})

app.delete('/api/person/:id', (request, response) => {
  Name.findById(request.params.id).then(name => {
    response.json(name)
  })
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