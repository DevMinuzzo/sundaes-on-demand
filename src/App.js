/* Components */
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'

/* Context */
import { OrderDetailsProvider } from './contexts/OrderDetailsContext'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmarion page does not need provider */}
    </Container>
  )
}

export default App
