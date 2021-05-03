import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ScoopOption from '../ScoopOption'

test('indicate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />)

  // expect input to be invalid with negative number
  const spinbuttonInput = screen.getByRole('spinbutton')
  userEvent.clear(spinbuttonInput)
  userEvent.type(spinbuttonInput, '-1')
  expect(spinbuttonInput).toHaveClass('is-invalid')

  // replace with decimal number
  userEvent.clear(spinbuttonInput)
  userEvent.type(spinbuttonInput, '2.5')
  expect(spinbuttonInput).toHaveClass('is-invalid')

  // replace with input that's too high
  userEvent.clear(spinbuttonInput)
  userEvent.type(spinbuttonInput, '11')
  expect(spinbuttonInput).toHaveClass('is-invalid')

  // replace with valid input
  // note: here we're testing our validation rules (namely that the input can display as valid)
  // and not react-bootstrap's response
  userEvent.clear(spinbuttonInput)
  userEvent.type(spinbuttonInput, '3')
  expect(spinbuttonInput).not.toHaveClass('is-invalid')
})