import { rest } from "msw";

export const handlers = [
  ///// Comments /////

  //Adds Comment
  rest.post(`/api/comment/add/:post_id`, (req, res, ctx) => {
    const {post_id} = req.params
    return res (
      ctx.status(200),
      ctx.json({comment: 'this is a test comment'})
    )
  })
]