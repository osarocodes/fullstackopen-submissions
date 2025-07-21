// const { response } = require('express')
const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const URI = `mongodb+srv://osarocodes:${password}@cluster0.aofb1nt.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(URI)
  .then(response => {
    console.log("connected successfully")
  })
  .catch(err => console.log("Unable to connect"))

const personSchema = {
  name: String,
  number: String
}

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
  })
}

if (process.argv.length < 3) {
  console.log("give pasword as argument")
  process.exit(1)
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log("Phonebook: ")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
console.log(process.argv.length)