import CommentDelete from "./CommentDelete"
import { render } from "@testing-library/react"

describe('Comment Delete Component Tests', () => {
  
  const getComments = jest.fn()
  const setCommentCount = jest.fn()
  const setShowOptions = jest.fn() 
  
  const commentDeleteComponent = <CommentDelete post_id={1} comment_id={1} getComments={getComments} setCommentCount={setCommentCount} setShowOptions={setShowOptions} />

  test('Renders Compnent', () => {
    render(commentDeleteComponent)
  })
})