const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://Gold:Jesse92@ds143971.mlab.com:43971/fullstack_persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

if (person.name === undefined) {
  Person
    .find({})
    .then(result => {
      console.log("puhelinluettelo: ")
      result.forEach(person => {
        console.log(person.name, person.number)
        mongoose.connection.close()
      })
    })
} else {
  person
  .save()
  .then(response => {
    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
    mongoose.connection.close()
  })
}