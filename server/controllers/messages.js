module.exports = {
  getInbox: async (req, res) => {
    const {user_id} = req.session.user 
    console.log('hitting!! user_id =>', user_id)
    const db = req.app.get('db')
    try {
      let inbox = await db.messages.get_message_inbox({user_id})
      res.status(200).send(inbox)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  sendMessage: async (req, res) => {
    const user_id_sender = req.session.user.user_id
    const user_id_receiver = req.params.user_id
    const {subject, message} = req.body
    console.log(user_id_sender, user_id_receiver, subject, message)
    const db = req.app.get('db')
    try {
      await db.messages.send_message({user_id_sender, user_id_receiver, subject, message})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteMessage: async (req, res) => {},
  
  getMessages: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      let messages = await db.messages.get_messages({user_id})
      res.status(200).send(messages)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getMessage: async (req, res) => {
    const {message_id} = req.params
    const db = req.app.get('db')
    try {
      let message = await db.messages.get_message({message_id})
      res.status(200).send(message)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateMessage: async (req, res) => {}
}