/* Components */
import Button from 'react-bootstrap/Button'
import Options from './Options'

/* Context */
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export default function OrderEntry({ setOrderPhase }) {

  const [orderDetailsCtx] = useOrderDetailsContext()

  const hasScoops = Array.from(orderDetailsCtx.scoops.values())
    .reduce((prev, next) => prev + next, 0)

  return (
    <div>
      <h1>Design your Sandae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetailsCtx.totals.grandTotal}</h2>
      <Button disabled={!hasScoops} onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  )
}