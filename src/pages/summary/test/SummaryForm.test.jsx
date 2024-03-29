import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SummaryForm from "../SummaryForm"

test("Initial conditions", () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  expect(checkbox).not.toBeChecked()

  const submitButton = screen.getByRole("button", { name: /confirm order/i })
  expect(submitButton).toBeDisabled()
})

test("Checkbox should enables the submit button when checked and disables when not checked", () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  const submitButton = screen.getByRole("button", { name: /confirm order/i })

  userEvent.click(checkbox)
  expect(submitButton).toBeEnabled()

  userEvent.click(checkbox)
  expect(submitButton).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />)
  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()
  // popover appears upon mouseover of checkbox
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()
  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  )
})

// test('' , () => {})
