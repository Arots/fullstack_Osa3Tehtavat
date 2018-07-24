const mongoose = require('mongoose')

const url = process.env.MONOGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})


module.exports = Person