const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const URI = process.env.MONGODB_URI

console.log('connecting to', URI)
mongoose.connect(URI)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})


noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)