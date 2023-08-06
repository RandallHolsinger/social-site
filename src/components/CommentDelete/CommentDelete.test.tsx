import { CommentDelete } from '../CommentDelete/CommentDelete'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const props = {
  comment_id: 1,
  post_id: 5,
  getComments: jest.fn(),
  setCommentCount: jest.fn(),
  setShowOptions: jest.fn()
}

const commentDeleteComponent = <CommentDelete {...props}/>

describe('CommentDelete Tests', () => {
  test('Should render CommentDelete Component', () => {
    render(commentDeleteComponent)
  })
  test('Should render delete button and be clickable', async () => {
    render(commentDeleteComponent)
    const buttonElement = screen.getByRole('button', {name: 'Delete'})
    userEvent.click(buttonElement)
  })
})