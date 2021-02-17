import { render, screen, fireEvent } from "@testing-library/react"
import SummaryForm from "../SummaryForm"

test("Initial conditions", () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  expect(checkbox).not.toBeChecked()

  const submitButton = screen.getByRole("button", { name: /confirm order/i })
  expect(submitButton).toBeDisabled()
})
test("Checkbox should enables the submit button when checked and disables when not checked", () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  const submitButton = screen.getByRole("button", { name: /confirm order/i })

  fireEvent.click(checkbox)
  expect(submitButton).toBeEnabled()

  fireEvent.click(checkbox)
  expect(submitButton).toBeDisabled()
})

// test('' , () => {})
