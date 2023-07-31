import { CommentAdd } from '../CommentAdd/CommentAdd'
import { Comments } from '../Comments/Comments'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const props = {
  post_id: 1,
  getComments: jest.fn()
}


const commentAddComponent = <CommentAdd {...props}/>
const commentsComponent = <Comments {...props}/>

describe('CommentAdd Tests', () => {
  test('Should Render CommentAdd Component', () => {
    render(commentAddComponent)
  })
  test('Should Render input element and user can add text', () => {
    render(commentAddComponent)
    const inputElement = screen.getByRole('textbox')
    userEvent.type(inputElement, 'Some comment here to add') 
  })
  test('Should render button and add comment when clicked', async () => {
    render(commentAddComponent)
    const buttonElement = screen.getByRole('button', {name: 'Comment'})
    userEvent.click(buttonElement)
    render(commentsComponent)
    const comment = screen.getByRole('list')
    expect(comment).toBeInTheDocument()
    expect(comment).toHaveTextContent('I am a comment')
  })
})