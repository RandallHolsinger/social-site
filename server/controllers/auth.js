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
    console.log('hello I am the user', user)
    
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}