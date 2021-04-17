export default function orderMock(rest) {
  return [
    rest.post("http://localhost:3030/order", (_, res, ctx) => {
      return res(ctx.json({ orderNumber: 123455676 })
      )
    })
  ]
}