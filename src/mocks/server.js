import { rest } from "msw"
import { setupServer } from "msw/node"

/* mocks */
import scoopMock from './api-mocks/scoops'

const mocks = [
    ...scoopMock(rest)
]

export const server = setupServer(...mocks)
