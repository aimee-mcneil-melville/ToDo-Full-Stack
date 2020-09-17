import "@testing-library/jest-dom"

import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import Login from "./Login"

test("", () => {
  render(<Login></Login>)

  fireEvent.change(screen.getByTestId(/username/i), {
    target: { value: "asd" },
  })
  fireEvent.change(screen.getByTestId(/password/i), {
    target: { value: "asd" },
  })

  fireEvent.click(screen.getByText(/submit/i))
})
