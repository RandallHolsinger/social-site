module.exports = {
  getMessageNotifications: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      let notifications = await db.messages.get_message_notifications({user_id})
      let count = notifications[0].count
      res.status(200).send(count)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateMessageNotifications: async (req, res) => {
    const {user_id} = req.session.user
    const {friend_uid} = req.params
    try {
      db.messages.update_message_notifications({user_id, friend_uid})
      res.sendStatus(500)
    } catch(err) {
      res.status(500).send(err)
    }
  },
  
  getInbox: async (req, res) => {
    const {user_id} = req.session.user 
    const db = req.app.get('db')
    try {
      let inbox = await db.messages.get_message_inbox({user_id})
      res.status(200).send(inbox)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteInboxItem: async (req, res) => {
    const {inbox_id} = req.params
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      db.messages.delete_inbox_item({inbox_id, user_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  sendMessage: async (req, res) => {
    const id_sender = req.session.user.user_id
    const id_receiver = req.params.user_id
    const {subject, message} = req.body
    const db = req.app.get('db')
    try {
      await db.messages.send_message({id_sender, id_receiver, subject, message})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  messageReply: async (req, res) => {
    const id_sender = req.session.user.user_id
    const {inbox_id, conversation_id, friend_uid, message, subject} = req.body
    const id_receiver = friend_uid
    console.log('id receiver on backend =>', id_receiver)
    const db = req.app.get('db')
    try {
      db.messages.send_message_reply({id_sender, id_receiver, inbox_id, conversation_id, message, subject})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteMessage: async (req, res) => {},
  
  getMessages: async (req, res) => {
    const {user_id} = req.session.user
    const {conversation_id} = req.params
    const db = req.app.get('db')
    try {
      let messages = await db.messages.get_messages({user_id, conversation_id})
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