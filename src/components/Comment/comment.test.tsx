import { Comment } from "./Comment"; 
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { IComment } from "../Comments/Comments";

const propCommentArgs: IComment = {
      user_id: 0,
      first_name: 'John',
      last_name: 'Doe',
      comment_id: 1,
      comment: 'This is a test comment',
      date: '2022-12-31 17:39:56.177 -0800'
  }

const testComponent = 
  <Provider store={store}>
    <Comment value={propCommentArgs} getComments={jest.fn()}/>
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