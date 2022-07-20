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

  confirmRequest: async (req, res) => {
    const {user_id_recieved} = req.session.user
    const {user_id_sent} = req.params
    try {
      await db.friends.confirm_request({user_id_recieved, user_id_sent})
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