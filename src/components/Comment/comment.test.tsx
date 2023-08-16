import Comment from './Comment'
import { screen } from '@testing-library/react'
import renderWithRedux from '../../test-utils/redux-test-utils'
import { IComment } from '../Comments/Comments'

const valueProps: IComment = {
  user_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  comment_id: 1,
  date: 'date',
  comment: 'hello world'
}

describe('Comment Component', () => {
  // stores component in a variable for reuse
  const component = <Comment value={valueProps} post_id={1} getComments={jest.fn()} setCommentCount={jest.fn()} />
  test('Comment component renders correctly', () => {
    renderWithRedux(component)
  })
  test('render users name properly', () => {
    renderWithRedux(component)
    let username = screen.getByRole('name')
    expect(username).toBeInTheDocument()
  })
  test('renders comment', () => {
    renderWithRedux(component)
    let comment = screen.getByRole('comment')
    expect(comment).toHaveTextContent('hello world')
  })
})