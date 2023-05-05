import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment"; 

const propArgs = {
  value: {
    user_id: 0,
    first_name: 'Randall',
    last_name: 'Holsinger',
    comment_id: 1,
    comment: 'This is my comment here',
    date: '2022-12-31 17:39:56.177 -0800'
  },
  getComments: jest.fn()
}

describe('Comment Component Tests', () => {
  test('Should Render Comment Component', () => {
    render(<Comment {...propArgs} />)
  })
  test('Should Contain A Username', () => {
    let username = screen.getByRole('name')
    expect(username).toHaveTextContent
  })
})