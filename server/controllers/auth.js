const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
     const {username, password, email} = req.body
     const {session} = req
     const db = req.app.get('db')
     let takenUsername = await db.auth.check_username({username})
     if(!takenUsername[0]){
        console.log('registering new user now')
        let salt = bcrypt.genSaltSync(15)
        let hash = bcrypt.hashSync(password, salt)
        let user = await db.auth.register({username, password: hash, email})
        user = user[0]
        session.user = user
         return res.status(200).send(session.user)
     } else {
      console.log('username is taken!')
      return res.sendStatus(409)
     }
  },
  
  login: async (req, res) => {
    const {username, password} = req.body
    const {session} =req
    const db = req.app.get('db')
    let user = await db.auth.login({username})
    user = user[0]
    if(user) {
      let authenticated = bcrypt.compareSync(password, user.password)
      if(authenticated) {
        delete user.password
        session.user = user
        res.status(200).send(session.user)
      } else {
        res.sendStatus(401)
      }
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  current: (req, res) => {
    const {user} = req.session
    if(user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  }
}