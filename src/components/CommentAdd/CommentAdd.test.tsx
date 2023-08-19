import Comments from "../Comments/Comments";
import CommentAdd from "./CommentAdd";
import Comment from "../Comment/Comment";
import { render, screen, waitFor } from "@testing-library/react";
import renderWithRedux from "../../test-utils/redux-test-utils";
import userEvent from '@testing-library/user-event'

const sampleComment = {
  user_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  profile_img: 'path/to/profile.jpg',
  comment_id: 2,
  comment: 'some comment',
  edited: false,
  date: '2023-08-14T12:34:56Z',
};


describe('Comment Add Component Tests', () => {
  const CommentAddComponent = <CommentAdd post_id={1} getComments={jest.fn()} setCommentCount={jest.fn()}/>
  test('renders component', () => {
    render(CommentAddComponent)
  })
  test('user can add a comment', async () => {
    render(CommentAddComponent)
    const AddCommentButton = await screen.findByRole('button', { name: 'Comment' })
    userEvent.click(AddCommentButton)
    render(<Comments post_id={1} setCommentCount={jest.fn()}/>)
    renderWithRedux(<Comment value={sampleComment} post_id={1} getComments={jest.fn()} setCommentCount={jest.fn()}/>)
    screen.debug()
    await waitFor(() => {
      const successMessage = screen.getByText('Comment was added sucessfully')
      expect(successMessage).toBeInTheDocument()
    })
  })
})