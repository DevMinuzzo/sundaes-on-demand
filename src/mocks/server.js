import { rest } from "msw"
import { setupServer } from "msw/node"

/* mocks */
import orderMock from './api-mocks/order'
import scoopMock from './api-mocks/scoops'
import toppingMock from './api-mocks/toppings'

const mocks = [
    ...scoopMock(rest),
    ...toppingMock(rest),
    ...orderMock(rest)
]

export const server = setupServer(...mocks)