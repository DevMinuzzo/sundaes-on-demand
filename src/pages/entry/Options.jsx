import { useEffect, useState } from "react"
import axios from "axios"

/* Components */
import Row from "react-bootstrap/Row"
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'

/* Const */
import { pricePerItem } from '../../constants'

/* Context */
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetailsCtx, updateItemCount] = useOrderDetailsContext()

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(() => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item, index) => (
    <ItemComponent key={`${item.name}-${index}`} {...item}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)} />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[optionType]} each</p>
      <p>{title} total: {orderDetailsCtx.totals[optionType]}</p>
      <Row>{optionItems}</Row>
    </>
  )
}