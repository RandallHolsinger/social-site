module.exports = {
  addComment: async (req, res) => {
    const {post_id} = req.params
    const {data} = req.body
    const db = req.app.get('db')
    try {
      await db.comments.add_comment({post_id, data})
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
    const db = req.app.get('db')
    try {
      let comments = await db.comments.get_comments()
      res.status(200).send(comments)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  updateComment: async (req, res) => {
    const {comment_id} = req.params
    const db = req.app.get('db')
    try {
      await db.comments.update_comment({comment_id})
      res.sendStatus(200)
    } catch(err) {
      res.status(500).send(err)
    }
  }
}