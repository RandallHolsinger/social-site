
require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')

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

