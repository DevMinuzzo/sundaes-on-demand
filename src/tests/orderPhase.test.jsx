import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('Order phases for happy path', async () => {
  // render the app
  render(<App />)
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i })
  userEvent.click(cherriesCheckbox)

  // find and click on the order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderSummaryButton)

  // check if summary is correct according to the order
  const summaryHeading = screen.getByRole('heading', { name: /order summary/i })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' })
  expect(toppingsHeading).toBeInTheDocument()

  expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument()
  expect(screen.getByText(/2 chocolate/i)).toBeInTheDocument()
  expect(screen.getByText(/cherries/i)).toBeInTheDocument()

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  userEvent.click(tcCheckbox)

  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmOrderButton)

  // expect "loading" to show
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i })
  expect(thankYouHeader).toBeInTheDocument()

  // expect that "loading" has disappeared
  const notLoading = screen.queryByText(/loading/i)
  expect(notLoading).not.toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  // click on "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()
  
  await screen.findByRole('spinbutton', { name: /vanilla/i })
  await screen.findByRole('checkbox', { name: /cherries/i })
})

test('Toppings header is not on summary page if no toppings ordered', async () => {
  // render the app
  render(<App />)

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderSummaryButton)

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})