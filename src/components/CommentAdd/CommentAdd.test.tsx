import { CommentAdd } from '../CommentAdd/CommentAdd'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const props = {
  post_id: 1,
  getComments: jest.fn()
}

const commentAddComponent = <CommentAdd {...props}/>

describe('CommentAdd Tests', () => {
  test('Should Render CommentAdd Component', () => {
    render(commentAddComponent)
  })
  test('Should Render input element and user can add text', () => {
    render(commentAddComponent)
    const inputElement = screen.getByRole('textbox')
    userEvent.type(inputElement, 'Some comment here to add') 
  })
  test('Should render button and be clickable by user', async () => {
    render(commentAddComponent)
    const buttonElement = screen.getByRole('button', {name: 'Comment'})
    userEvent.click(buttonElement)
  })
})