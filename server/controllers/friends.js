module.exports = {
  sendRequest: async (req, res) => {
    const user_id_sender = req.session.user.user_id
    const user_id_reciever = req.params.user_id
    const db = req.app.get('db')
    try {
      await db.friends.send_request({user_id_sender, user_id_reciever})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getRequests: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      let requests = await db.friends.get_friend_requests({user_id})
      console.log('requests ==> ', requests)
      res.status(200).send(requests)
    } catch(err) {
      res.status(500).send(err)
    }
  }, 

  checkRequest: async (req, res) => {
    const user_id_sender = req.session.user.user_id
    const user_id_reciever = req.params.user_id
    const db = req.app.get('db')
    try {
      let sentRequest = await db.friends.check_friend_request({user_id_sender, user_id_reciever})
      res.status(200).send(sentRequest)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  confirmRequest: async (req, res) => {
    const {friend_id} = req.params
    const db = req.app.get('db')
    console.log('hit', friend_id)
    try {
      await db.friends.confirm_request({friend_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteFriend: async (req, res) => {
    const {friend_id} = req.params
    const db = req.app.get('db')
    try {
      await db.friends.delete_friend({friend_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getFriends: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      let friends = await db.friends.get_friends({user_id})
      res.status(200).send(friends)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getFriend: async (req, res) => {
    const {friend_id} = req.params
    const db = req.app.get('db')
    try {
      let friend = await db.friends.get_friend({friend_id})
      res.status(200).send(friend)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}