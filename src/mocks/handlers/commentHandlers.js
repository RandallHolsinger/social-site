import { error } from "console";
import { rest } from "msw";

export const commentHandlers = [

  // Adds Comment
  rest.post('/api/comment/add/:post_id', (req, res, ctx) => {
    const {post_id} = req.params
    const { comment }  = req.json()
    if (post_id === 1 && comment) {
      return res (
        ctx.status(200),
        ctx.json({
          post_id,
          comment
        })
      )
    } else {
      return res(
        ctx.status(500),
        ctx.json({errorMessage: 'Could not add comment'})
      )
    }
  }),
  
  // Deletes Comment
  rest.delete('/api/comment/delete/:comment_id', (req, res, ctx) => {
    const {comment_id} = req.params
    if(comment_id === 1) {
      return res(
        ctx.status(200)
      )
    } else {
      return res (
        ctx.status(500),
        ctx.json({errorMessage: 'Could not delete the comment'})
      )
    }
  }),
  
  // Gets Comments
  rest.get('/api/comments/:post_id', (req, res, ctx) => {
    const {post_id} = req.params
    if(post_id === 1) {
      return res(
        ctx.status(200),
        ctx.json({
          comment_id: 1,
          comment: 'I am a comment'
        })
      )
    } else {
      return res(
        ctx.status(500),
        ctx.json({errorMessage: 'Could not get comments'})
      )
    }
  })
]