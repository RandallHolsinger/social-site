
require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrlAuth = require('./controllers/auth')
const ctrlUsers = require('./controllers/users')
const ctrlFriends = require('./controllers/friends')
const ctrlPosts = require('./controllers/posts')
const ctrlComments = require('./controllers/comments')
const ctrlMessages = require('./controllers/messages')

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

///// Authentication Endpoints /////

//Register
app.post('/auth/user/register', ctrlAuth.register)

//Login
app.post('/auth/user/login', ctrlAuth.login)

//Logout
app.post('/auth/user/logout', ctrlAuth.logout)

//Get Current User
app.get('/auth/user/current', ctrlAuth.current)


///// Users Endpoint /////

// Get Users
app.get('/api/users', ctrlUsers.getUsers)

// Update User Personal Profile
app.put('/api/user/update/:user_id', ctrlUsers.updateUser)

// Delete User Personal Profile
app.delete('/api/user/delete/:user_id', ctrlUsers.deleteUser)


///// Post's Endpoints /////

// Add Post
app.post('/api/post/add', ctrlPosts.addPost)

// Delete Post
app.delete('/api/post/delete/:post_id', ctrlPosts.deletePost)

// Get Posts
app.get('/api/posts', ctrlPosts.getPosts)

// Edit Post 
app.put('/api/post/edit/:post_id', ctrlPosts.updatePost)


///// Comment's Endpoints /////

// Add Comment
app.post('/api/comment/add/:post_id', ctrlComments.addComment)

// Delete Comment
app.delete('/api/comment/delete/:comment_id', ctrlComments.deleteComment)

// Get Comments
app.get('/api/commments/:post_id', ctrlComments.getComments)

// Edit Comment
app.put('/api/commment/edit/:comment_id', ctrlComments.updateComment)


///// Friend's Endpoints /////

// Send Friend Request
app.post('/api/friend_request/send/:user_id', ctrlFriends.sendRequest)

// Confirm Friend
app.put('/api/friend_request/confirm/:user_id', ctrlFriends.confirmRequest)

// Delete Friend
app.delete('/api/friend/delete/:user_id', ctrlFriends.deleteFriend)

// Get Friends
app.get('/api/friends', ctrlFriends.getFriends)


///// Messages Endpoints /////

// Send Message
app.post('/api/message/send/:user_id', ctrlMessages.sendMessage)

// Delete Message
app.delete('/api/message/delete/:message_id', ctrlMessages.deleteMessage)

// Get All Messages
app.get('/api/messages', ctrlMessages.getMessages)

// Get Message 
app.get('/api/message/:message_id', ctrlMessages.getMessage)





