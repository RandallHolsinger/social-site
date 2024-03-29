const { rmSync } = require('fs')
const path = require('path')

module.exports = {
  getUsers: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      const users = await db.users.get_users({user_id})
      res.status(200).send(users)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getUser: async (req, res) => {
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

    const {
      currentCityInput,
      stateProvinceInput,
      formatedBirthday,
      workInput,
      highSchoolInput,
      collegeInput,
      aboutMeInput
    } = req.body
    
    const city = currentCityInput
    const state_province = stateProvinceInput
    const dob = formatedBirthday
    const occupation = workInput
    const high_school = highSchoolInput
    const college = collegeInput
    const about_me = aboutMeInput

    const db = req.app.get('db')

    try {
      db.users.update_user({
        user_id, 
        city, 
        state_province, 
        dob, 
        occupation,
        high_school,
        college,
        about_me
      })
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateProfileImage: async (req, res) => {
    const {filename} = req.file
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      db.users.update_user_image({filename, user_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getProfileImage: async (req, res) => {
    const {image} = req.params
    try {
      let imagePath = path.join(__dirname, '..', 'uploads', 'images', image);
      res.status(200).sendFile(imagePath)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteUser: async (req, res) => {
    const {user_id} = req.session.user
    const db = req.app.get('db')
    try {
      await db.delete_user({user_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}