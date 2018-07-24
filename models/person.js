const mongoose = require('mongoose')

const url = 'mongodb://Gold:Jesse92@ds143971.mlab.com:43971/fullstack_persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})


module.exports = Person