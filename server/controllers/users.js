module.exports = {
  getUsers: async (req, res) => {
    const db = req.app.get('db')
    try {
      const users = await db.users.get_users()
      res.status(200).send(users)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getUser: async(req, res) => {
    const {user_id} = req.params
    const db = req.app.get('db')
    try {
      let user = await db.users.get_user({user_id})
      res.status(200).send(user)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateUser: async (req, res) => {
    const {user_id} = req.session.user
    const {email, dob, city, state, aboutMe} = req.body
    try {
      let user = await db.update_user([user_id, email, dob, city, state, aboutMe])
      res.status(200).send(user)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteUser: async (req, res) => {
    const {user_id} = req.session.user
    try {
      await db.delete_user({user_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}