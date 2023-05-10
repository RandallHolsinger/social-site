import { CommentAdd } from '../CommentAdd/CommentAdd'
import { findByText, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const propsCommentAddArgs = {
  post_id: 1,
  getComments: jest.fn()
}

const commentAddComponent = <CommentAdd {...propsCommentAddArgs}/>

describe('CommentAdd Tests', () => {
  test('Should Render CommentAdd Component', () => {
    render(commentAddComponent)
  })
  test('Should Add A Comment', async () => {
    render(commentAddComponent)
    
  })
})