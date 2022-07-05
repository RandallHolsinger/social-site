const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
     const {username, password, email} = req.body
     const {session} = req
     const db = req.app.get('db')
     let takenUsername = await db.auth.check_username({username})
     console.log('response from check_username =>', takenUsername)
     if(!takenUsername[0]){
      try{
        let salt = bcrypt.genSaltSync(15)
        let hash = bcrypt.hashSync(password, salt)
        let user = await db.auth.register({username, password: hash, email})
        user = user[0]
        session.user = user
        console.log('here is the session =>', session)
        res.status(200).send(session.user)
      } catch(err) {
        res.status(409).send(err)
      }
     } 
  }
}