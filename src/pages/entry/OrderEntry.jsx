/* Components */
import Options from './Options'

/* Context */
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export default function OrderEntry() {

  const [orderDetailsCtx] = useOrderDetailsContext()

  return (
    <div>
      <h1>Design your Sandae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetailsCtx.totals.grandTotal}</h2>
    </div>
  )
}