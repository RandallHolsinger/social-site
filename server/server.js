
require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrlAuth = require('./controllers/auth')
const auth = require('./controllers/auth')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('You are Connected to the Database')
  app.listen(SERVER_PORT, () => console.log(`Listening On Server Port#: ${SERVER_PORT}`))
})

// Authentication Endpoints //

//Register
app.post('/auth/register', ctrlAuth.register)

//Login
app.post('/auth/login', ctrlAuth.login)

//Logout
app.post('/auth/logout', ctrlAuth.logout)



