module.exports = {
  addPost: async (req, res) => {
    const {user_id} = req.session.user
    const {titleInput, postInput} = req.body
    const title = titleInput
    const data = postInput
    const {filename} = req.file
    const db = req.app.get('db')
    try {
      await db.posts.add_post({user_id, title, data, filename})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deletePost: async (req, res) => {
    const {post_id} = req.params
    const db = req.app.get('db')
    try {
      await db.posts.delete_post({post_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    try {
      let posts = await db.posts.get_all_posts()
      res.status(200).send(posts)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getUserPosts: async (req, res) => {
    const {user_id} = req.params
    const db = req.app.get('db')
    try {
      let userPosts = await db.posts.get_user_posts({user_id})
      res.status(200).send(userPosts)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updatePost: async (req, res) => {
    const {post_id} = req.params
    const {editPostTitleInput, editPostInput} = req.body
    const {filename} = req.file
    const data = editPostInput
    const title = editPostTitleInput
    const db = req.app.get('db')
    try {
      await db.posts.update_post({post_id, data, title, filename})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  likePost: async (req, res) => {
    const {post_id} = req.params
    const db = req.app.get('db')
    try {
      db.posts.like_post({post_id})
      res.status(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  unlikePost: async (req, res) => {
    const {post_id} = req.params
    const db = req.app.get('db')
    try {
      db.posts.unlike_post({post_id})
      res.status(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}