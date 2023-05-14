import { error } from "console";
import { rest } from "msw";

export const handlers = [
  ///// Comments /////

  //Adds Comment
  rest.post(`/api/comment/add/1`, (req, res, ctx) => {
    const {post_id} = req.params
    const { comment }  = req.json()
    if (post_id && comment) {
      return res (
        ctx.status(200),
        ctx.json({
          post_id,
          comment
        })
      )
    } else {
      return res(
        ctx(500),
        ctx.json({errorMessage: 'Could not add comment'})
      )
    }
  })
]