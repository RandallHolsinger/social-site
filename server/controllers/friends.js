module.exports = {

  sendFriendRequest: async (req, res) => {
    const source_id = req.params.user_id
    const target_id = req.session.user.user_id
    const db = req.app.get('db')
    try {
      await db.friends.send_friend_request({source_id, target_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getFriendStatus: async (req, res) => {
    const {user_id} = req.session.user
    const user_id2 = req.params.user_id
    const db = req.app.get('db')
    console.log('hitting backend!!', 'user_id ==>', user_id, 'user_id2 ==>', user_id2)
    try {
      let friendStatus = await db.friends.friend_status({user_id, user_id2})
      res.status(200).send(friendStatus)
    } catch(err){
      res.status(500).send(err)
    }
  }

}