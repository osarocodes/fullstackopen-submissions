const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (password.length < 3) {
    return response.status(400).json({ error: "Password length is shorter than the allowed length (3)." })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})
module.exports = usersRouter