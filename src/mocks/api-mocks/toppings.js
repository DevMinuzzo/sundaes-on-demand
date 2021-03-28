export default function toppingMock(rest) {
  return [
    rest.get("http://localhost:3030/toppings", (_, res, ctx) => {
      return res(
        ctx.json([
          {
            name: 'Cherries',
            imagePath: '/images/cherries.png'
          },
          {
            name: 'M&Ms',
            imagePath: '/images/m-and-ms.png'
          },
          {
            name: 'Hot Fudge',
            imagePath: '/images/hot-fudge.png'
          }
        ])
      )
    })
  ]
}