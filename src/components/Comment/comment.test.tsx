import { render } from '@testing-library/react'
import Comment from './Comment'
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
  test('Comment component renders correctly', () => {
    const component = render(<Comment value={valueProps} post_id={1} getComments={jest.fn()} setCommentCount={jest.fn()}/>)
    expect(component).toBeInTheDocument()
  })
  
})