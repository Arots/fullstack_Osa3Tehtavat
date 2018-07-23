const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://xxx:xxx@ds143971.mlab.com:43971/fullstack_persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: 'Arto Hellas',
  number: '040-123456'
})

person
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })