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