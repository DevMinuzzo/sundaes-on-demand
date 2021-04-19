import React from 'react'
import SummaryForm from './SummaryForm'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetailsCtx] = useOrderDetailsContext()

  const scoopsArray = Array.from(orderDetailsCtx.scoops.entries())
  const scoopsList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const hasToppings = orderDetailsCtx.toppings.size > 0
  let toppingsDisplay = null

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetailsCtx.toppings.keys())
    const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>)
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetailsCtx.totals.toppings}</h2>
        <ul>{toppingsList}</ul>
      </>
    )
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetailsCtx.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}