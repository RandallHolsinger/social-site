import Comment from './Comment'
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
  test('Comment component renders correctly', () => {
    renderWithRedux(<Comment value={valueProps} post_id={1} getComments={jest.fn()} setCommentCount={jest.fn()} />)
  })
  
})