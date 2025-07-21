const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

console.log("Connecting to", url)
mongoose.connect(url)
  .then(result => {
    console.log("Connected successfully")
  })
  .catch(error => {
    console.log("Unable to connect: ", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      minLength: 3,
      required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! format should be xxx-xxx-xxxx`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model("Person", personSchema)