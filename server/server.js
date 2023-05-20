
require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, CA_CERT, SESSION_SECRET} = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const multer = require('multer')
const uuid = require('uuid').v4
const http = require('https');
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

app.use(express.static( `${__dirname}/../build` ) )

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
// app.post('/api/post/image', imageUpload.single('file'))


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

// Update User Profile Image
app.put('/api/user/update/profile/image', imageUpload.single('file'), ctrlUsers.updateProfileImage)

// Delete User Personal Profile
app.delete('/api/user/delete/:user_id', ctrlUsers.deleteUser)


///// Post's Endpoints /////

// Add Post
app.post('/api/post/add', imageUpload.single('file'), ctrlPosts.addPost)

// Get All Posts
app.get('/api/posts', ctrlPosts.getAllPosts)

// Get User Posts
app.get('/api/posts/:user_id', ctrlPosts.getUserPosts)

// Edit Post 
app.put('/api/post/edit/:post_id', imageUpload.single('file'), ctrlPosts.updatePost)

// Delete Post
app.delete('/api/post/delete/:post_id', ctrlPosts.deletePost)

// Like Post
app.put('/api/post/like/:post_id', ctrlPosts.likePost)

// Unlike Post
app.put('/api/post/unlike/:post_id', ctrlPosts.unlikePost)

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


///// Inbox EndPoints /////

// Get Messaging Inbox
app.get('/api/message/inbox', ctrlMessages.getInbox)

// Delete Inbox Item
app.delete('/api/inbox/delete/:inbox_id', ctrlMessages.deleteInboxItem)


///// Messages Endpoints /////

// Create Inbox and Send Message
app.post('/api/message/send/:user_id', ctrlMessages.sendMessage)

//Message Reply
app.post('/api/message/reply/send', ctrlMessages.messageReply)

// Delete Message
app.delete('/api/message/delete/:message_id', ctrlMessages.deleteMessage)

// Get All Messages
app.get('/api/messages/:conversation_id', ctrlMessages.getMessages)

// Get Message 
app.get('/api/message/:message_id', ctrlMessages.getMessage)


///// Socket.IO /////

//Socket.io connects
let onlineUsersCount = 0
io.on('connection', (socket) => {
  onlineUsersCount++
  io.emit('onlineCount', onlineUsersCount)
  console.log(`A new user connected socketID: ${socket.id}`)
  io.emit('welcome', 'user has joined the chat')
  socket.on('message', (data) => {
    console.log('message on server =>', data)
    io.emit('messageResponse', data)
  })

  socket.on('disconnect', (reason) => {
    console.log(`User left chat because => ${reason}`)
    onlineUsersCount--
    io.emit('userLeft', 'user has left the chat')
    io.emit('onlineCount', onlineUsersCount)
  })
})









