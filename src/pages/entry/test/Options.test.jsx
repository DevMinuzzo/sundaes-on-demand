import { render, screen } from "@testing-library/react"
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