import React  from "react";
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment"; 

const propArgs = {
  value: {
    user_id: 0,
    first_name: 'Randall',
    last_name: 'Holsinger',
    comment_id: 1,
    comment: 'This is my comment here'
  }
}


describe('Comment Component Tests', () => {
  test('Should Render Comment Component', () => {
    render(<Comment {...propArgs} />)
  })
})