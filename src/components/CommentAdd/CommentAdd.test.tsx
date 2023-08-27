import CommentAdd from "./CommentAdd";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'


describe('Comment Add Component Tests', () => {

  const getComments = jest.fn()
  const setCommnentCount = jest.fn()

  const CommentAddComponent = <CommentAdd post_id={1} getComments={getComments} setCommentCount={setCommnentCount}/>
  
  test('Renders component', () => {
    render(CommentAddComponent)
  })
  test('Input renders correctly', () => {
    render(CommentAddComponent)
    const commentInputElement = screen.getByPlaceholderText('Add A Comment Here')
    expect(commentInputElement).toBeInTheDocument()
  })
  test('Add comment button renders correctly', () => {
    render(CommentAddComponent)
    const addCommentButton = screen.getByRole('button', {name: 'Comment'})
    expect(addCommentButton).toBeInTheDocument()
  })
  test('User can add a comment', async () => {
    render(CommentAddComponent)
    const commentInputElement =  screen.getByPlaceholderText('Add A Comment Here')
    userEvent.type(commentInputElement, 'Here is my comment')
    const addCommentButton =  await screen.findByRole('button', { name: 'Comment' })
    await userEvent.click(addCommentButton)
    await waitFor(() => {
      expect(getComments).toHaveBeenCalled()
      expect(setCommnentCount).toHaveBeenCalled() 
    })
  })
})