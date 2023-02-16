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
    const id_sender = req.session.user.user_id
    const {user_id} = req.params
    const {subject, message} = req.body
    console.log('me =>', id_sender,'target =>', user_id, subject, message)
    const db = req.app.get('db')
    try {
      await db.messages.send_message({id_sender, user_id, subject, message})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteMessage: async (req, res) => {},
  
  getMessages: async (req, res) => {
    const {user_id} = req.session.user
    const {inbox_id} = req.params
    const db = req.app.get('db')
    try {
      let messages = await db.messages.get_messages({user_id, inbox_id})
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