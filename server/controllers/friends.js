module.exports = {

  sendFriendRequest: async (req, res) => {
    const target_id = req.params.user_id
    const source_id = req.session.user.user_id
    const db = req.app.get('db')
    try {
      await db.friends.send_friend_request({source_id, target_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  acceptFriendRequest: async (req, res) => {
    const source_id = req.params.user_id
    const target_id = req.session.user.user_id
    console.log('hitting backend')
    const db = req.app.get('db')
    try {
      await db.friends.accept_friend_request({source_id, target_id})
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

  getAllFriends: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      let friends = await db.friends.get_all_friends({user_id})
      res.status(200).send(friends)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getFriendStatus: async (req, res) => {
    const {user_id} = req.session.user
    const user_id2 = req.params.user_id
    const db = req.app.get('db')
    try {
      let friendStatus = await db.friends.friend_status({user_id, user_id2})
      res.status(200).send(friendStatus)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getFriendsList: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    try {
      let friendsList = await db.friends.get_friends_list({user_id})
      res.status(200).send(friendsList)
    } catch(err) {
      res.status(500).send(err)
    }
  } 

}