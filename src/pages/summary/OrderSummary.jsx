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

  const toppingsArray = Array.from(orderDetailsCtx.toppings.keys())
  const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetailsCtx.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {orderDetailsCtx.totals.toppings}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}