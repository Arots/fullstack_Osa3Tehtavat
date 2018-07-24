const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
})

app.get('/api/persons/:id', (req, res) => {
    
    Person
        .findById(req.params.id)
        .then(result => {
            res.json(formatPerson(result))
        })
})

app.get('/info', (req, res) => {
    const uusiPaiva = new Date()
    res.send(`<div>puhelinluettelossa ${persons.length}
     henkilön tiedot</div> <br/> <div> ${uusiPaiva} </div>`)
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(res.params.id)
        .then(result => {
            res.status(204).end()
        })
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    console.log(person)

    person
        .save()
        .then(result => {
            res.json(formatPerson(result))
        })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})