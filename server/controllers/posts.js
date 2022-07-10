module.exports = {
  addPost: async (req, res) => {
    const {user_id} = req.session.user
    const {data} = req.body
    const db = req.app.get('db')
    try {
      await db.posts.add_post({user_id, data})
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

  getPosts: async (req, res) => {
    const db = req.ap.get('db')
    try {
      let posts = await db.posts.get_posts()
      res.status(200).send(posts)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updatePost: async (req, res) => {
    const {post_id} = req.params
    try {
      await db.update_post({post_id})
      res.sendStatud(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}