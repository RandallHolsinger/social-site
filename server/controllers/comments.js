module.exports = {
  addComment: async (req, res) => {
    const {user_id} = req.session.user
    const {post_id} = req.params
    const {data} = req.body
    const db = req.app.get('db')
    try {
      await db.comments.add_comment({user_id, post_id, data})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  deleteComment: async (req, res) => {
    const {comment_id} = req.params
    const db = req.app.get('db')
    try {
      await db.comments.delete_comment({comment_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getComments: async (req, res) => {
    const {post_id} = req.params
    console.log('post ID here ==>', post_id)
    const db = req.app.get('db')
    try {
      let comments = await db.comments.get_comments({post_id})
      res.status(200).send(comments)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  getUserComments: async (req, res) => {
    const {user_id} = req.session.user 
    const db = req.app.get('db')
    try {
      let userComments = await db.comments.get_user_comments({user_id})
      res.status(200).send(userComments)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateComment: async (req, res) => {
    const {comment_id} = req.params
    const {data} = req.body
    const db = req.app.get('db')
    try {
      await db.comments.update_comment({comment_id, data})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}