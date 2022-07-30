
require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const ctrlAuth = require('./controllers/auth')
const ctrlUsers = require('./controllers/users')
const ctrlFriends = require('./controllers/friends')
const ctrlPosts = require('./controllers/posts')
const ctrlComments = require('./controllers/comments')
const ctrlMessages = require('./controllers/messages')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(session({
  store: new pgSession({
    pool: pgPool
  }),
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

// Get User
app.get('/api/user/:user_id', ctrlUsers.getUser)

// Update User Personal Profile
app.put('/api/user/update/:user_id', ctrlUsers.updateUser)

// Delete User Personal Profile
app.delete('/api/user/delete/:user_id', ctrlUsers.deleteUser)


///// Post's Endpoints /////

// Add Post
app.post('/api/post/add', ctrlPosts.addPost)

// Delete Post
app.delete('/api/post/delete/:post_id', ctrlPosts.deletePost)

// Get All Posts
app.get('/api/posts', ctrlPosts.getAllPosts)

// Get User Posts
app.get('/api/posts/user', ctrlPosts.getUserPosts)

// Edit Post 
app.put('/api/post/edit/:post_id', ctrlPosts.updatePost)


///// Comment's Endpoints /////

// Add Comment
app.post('/api/comment/add/:post_id', ctrlComments.addComment)

// Delete Comment
app.delete('/api/comment/delete/:comment_id', ctrlComments.deleteComment)

// Get Comments
app.get('/api/comments/:post_id', ctrlComments.getComments)

// Ger User Comments
app.get('/api/comments/user', ctrlComments.getUserComments)

// Edit Comment
app.put('/api/comment/edit/:comment_id', ctrlComments.updateComment)


///// Friend's Endpoints /////

// Send Friend Request
app.post('/api/friend/request/send/:user_id', ctrlFriends.sendRequest)

// Get Friend Requests
app.get('/api/friend/requests', ctrlFriends.getRequests)

// Get Friend Request From User
app.get('/api/friend/request/:user_id', ctrlFriends.getUserRequests)

// Get Friend Status
app.get('/api/friend/status/:user_id', ctrlFriends.checkFriendStatus)

// Confirm Friend
app.put('/api/friend/request/confirm/:friend_id', ctrlFriends.confirmRequest)

// Delete Friend
app.delete('/api/friend/delete/friend_id', ctrlFriends.deleteFriend)

// Get Friends
app.get('/api/friends', ctrlFriends.getFriends)

// Get Friend
app.get('/api/friend/:friend_id', ctrlFriends.getFriend)


///// Messages Endpoints /////

// Get Messaging Inbox
app.get('/api/message/inbox', ctrlMessages.getInbox)

// Send Message
app.post('/api/message/send/:user_id', ctrlMessages.sendMessage)

// Delete Message
app.delete('/api/message/delete/:message_id', ctrlMessages.deleteMessage)

// Get All Messages
app.get('/api/messages', ctrlMessages.getMessages)

// Get Message 
app.get('/api/message/:message_id', ctrlMessages.getMessage)





