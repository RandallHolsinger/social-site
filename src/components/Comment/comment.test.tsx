import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment"; 
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const propCommentArgs = {
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

const testComponent = 
  <Provider store={store}>
    <Comment {...propCommentArgs} />
  </Provider>


describe('Comment Component Tests', () => {
  test('Should Render Comment Component', () => {
    render(testComponent)
  })
  test('Should Contain A Username', () => {
    render(testComponent)
    let usernameElement = screen.getByRole('name')
    expect(usernameElement).toBeInTheDocument
  })
  test('Should Contain A Comment', () => {
    render(testComponent)
    let commentElement = screen.getByRole('comment')
    expect(commentElement).toBeInDocument
  })
})