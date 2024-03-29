/* Components */
import Container from 'react-bootstrap/Container'

import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

/* Context */
import { OrderDetailsProvider } from './contexts/OrderDetailsContext'
import { useState } from 'react'

function App() {

  const [orderPhase, setOrderPhase] = useState('inProgress')

  let Component = OrderEntry // default

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break
    case 'review':
      Component = OrderSummary
      break
    case 'completed':
      Component = OrderConfirmation
      break
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  )
}

export default App
