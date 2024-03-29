export default function scoopMock(rest) {
  return [
    rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
      return res(
        ctx.json([
          {
            name: "Chocolate",
            imagePath: "/images/chocolate.png",
          },
          {
            name: "Vanilla",
            imagePath: "/images/vanilla.png",
          },
        ])
      )
    })
  ]
}