
require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, CA_CERT, SESSION_SECRET} = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const multer = require('multer')
const uuid = require('uuid').v4
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  pingTimeout: 8 * 60 * 60 * 1000,
  cors: {
    origin: 'http://localhost:3000/'
  }
})
const cors = require('cors')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const ctrlAuth = require('./controllers/auth')
const ctrlUsers = require('./controllers/users')
const ctrlFriends = require('./controllers/friends')
const ctrlPosts = require('./controllers/posts')
const ctrlComments = require('./controllers/comments')
const ctrlMessages = require('./controllers/messages')

app.use(cors())
app.use(express.json())

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

const sessionMiddleware =  session({
  store: new pgSession({
    pool: pgPool
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000
  }
})

//Middlware to attach express session to the socket session
app.use(sessionMiddleware)
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

//Connects to the database
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('You are Connected to the Database')
  server.listen(SERVER_PORT, () => console.log(`Listening On Server Port#: ${SERVER_PORT}`))
})

///// Multer MiddleWare /////
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`)
  }
})
const imageUpload = multer({storage: imageStorage})
///// Upload Endpoints To File System /////
app.post('/api/post/image', imageUpload.single('file'))


///// Authentication Endpoints /////

//Register
app.post('/auth/user/register', ctrlAuth.register)

//Login
app.post('/auth/user/login', ctrlAuth.login)

//Logout
app.post('/auth/user/logout', ctrlAuth.logout)

//Get Current User
app.get('/auth/user/current', ctrlAuth.current)


///// Users Endpoints /////

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
app.post('/api/post/add', imageUpload.single('file'), ctrlPosts.addPost)

// Get All Posts
app.get('/api/posts', ctrlPosts.getAllPosts)

// Get User Posts
app.get('/api/posts/user', ctrlPosts.getUserPosts)

// Edit Post 
app.put('/api/post/edit/:post_id', ctrlPosts.updatePost)

// Delete Post
app.delete('/api/post/delete/:post_id', ctrlPosts.deletePost)


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

//Send A Friend Request
app.post('/api/friend/send/:user_id', ctrlFriends.sendFriendRequest)

//Accept Friend Request
app.put('/api/friend/accept/:user_id', ctrlFriends.acceptFriendRequest)

//Delete Friend
app.delete('/api/friend/delete/:friend_id', ctrlFriends.deleteFriend)

//Get All Friends
app.get('/api/friends', ctrlFriends.getAllFriends)

//Check FriendStatus
app.get('/api/friend/status/:user_id', ctrlFriends.getFriendStatus)

//Get Friends List
app.get('/api/friends/list', ctrlFriends.getFriendsList)


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


///// Socket.IO /////

//Socket.io connects
let onlineUsers = []
io.on('connection', (socket) => {

  
  console.log(`${socket.id} user just connected...`)
  
  socket.on('getOnlineUsers', (text) => {
    console.log('server message =>', text)
    socket.emit('onlineUsersList', onlineUsers)
    console.log('list of online users ==>', onlineUsers)
  })
 
  //user joins room with other user emits message between clients
  // socket.on('joinRoom', room => {
  //   console.log('joining room =>', room)
  //   socket.join(room)
  // })
  
  socket.on('privateMessage', data => {
    console.log('here is the message going to server ==>', data)
    io.to(data.targetSocketID).emit('messageResponse', data)
  })

  // leaves current room
  // socket.on('leaveRoom', room => {
  //    console.log('leaving room =>', room)
  //    socket.leave(room)
  // })

  // emits an is typing message to other client sockets
  socket.on('typing', data => socket.broadcast.emit('typing response', data))

  // Logic when user logs in adds the user to local storage then sent here
  // to be added to the online users list.
  socket.on('login', data => {
    onlineUsers.push(data)
    console.log('online user login =>', data)
  })
  
  
  // Compares online sockets with friends list and sends to client
  // which friends are online.
  socket.on('checkOnlineStatus', friends => {
    let onlineFriendsArray = []
    onlineUsers.forEach( user => {
      friends.forEach( friend => {
        if(user.userId == friend.user_id) {
          onlineFriendsArray.push(user)
        }
      })
    })
    socket.emit('onlineStatus', onlineFriendsArray)
    })
  // Disconnects the socket
  socket.on('disconnect', () => {
    console.log(`user: ${socket.id} disconnected...`)
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socket.id);
    socket.disconnect()
  })
})










