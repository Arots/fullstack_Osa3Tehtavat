const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Timoteus Teme",
      "number": "0400 0000 1111",
      "id": 3
    },
    {
      "name": "Johannes",
      "number": "234445",
      "id": 4
    },
    {
      "name": "Anna Anniina",
      "number": "88899",
      "id": 5
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1> <div>NO PLEASE</div>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id )
    if ( person ) {
        response.json(person)
      } else {
        return response.status(400).json({error: 'content missing'})
    }
})

app.get('/info', (req, res) => {
    const uusiPaiva = new Date()
    res.send(`<div>puhelinluettelossa ${persons.length}
     henkilön tiedot</div> <br/> <div> ${uusiPaiva} </div>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    } else if (persons.map(person => person.name).includes(body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(200))
    }

    persons = persons.concat(person)

    res.json(persons)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})