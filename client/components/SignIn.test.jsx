import React from "react"

import { render, fireEvent } from "@testing-library/react"
import SignIn from "./SignIn"

describe("Input Value", () => {
  it("Input field is changin state", () => {
    const { queryByPlaceholderText } = render(<SignIn />)
    const usernameInput = queryByPlaceholderText("Username")
    fireEvent.change(usernameInput, { target: { value: "Hey" } })
    expect(usernameInput.value).toBe("Hey")
  })
})
describe("Submit button", () => {
  it("triggers submit function", () => {
    const { queryByTestId } = render(<SignIn />)
    fireEvent.click(queryByTestId("submit-button"))
  })
})
