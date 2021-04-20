import { render, screen, waitFor } from "../../../test-utils/testing-library-utils"
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'
import userEvent from "@testing-library/user-event"

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (_, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (_, res, ctx) => res(ctx.status(500)))
  )
  render(<OrderEntry setOrderPhase={jest.fn()}/>)

  // Find both scoops and toppings alerts
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})

test('If there area no scoops the "order sandae" button should be disabled', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()}/>)
  
  // check if the button is disabled
  const orderSandaeButton = screen.getByRole('button', { name: /order sundae/i })
  expect(orderSandaeButton).toBeDisabled()

  // add one scoop and check if the button is enabled
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(orderSandaeButton).toBeEnabled()

  // remove the scoops and check if button is disabled
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '0')
  expect(orderSandaeButton).toBeDisabled()
})