import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test-utils/testing-library-utils"

import Options from '../Options'

test('diplays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />)

  // find the images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text images
  const altTexts = scoopImages.map(element => element.alt)
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"])
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />)

  //find the images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  // confirm alt text images
  const altTexts = toppingImages.map(element => element.alt)
  expect(altTexts).toEqual(["Cherries topping", "M&Ms topping", "Hot Fudge topping"])
})

test("don't update total if scoops input is invalid", async () => {
  render(<Options optionType="scoops" />)

  // expect buton to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '-1')

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsSubtotal).toBeInTheDocument()
})