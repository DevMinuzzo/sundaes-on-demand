import { useEffect, useState } from "react"
import axios from "axios"
import Row from "react-bootstrap/Row"

/* Components */
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(() => setError(true))
  }, [optionType])

  if(error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = items.map((item, index) => (
    <ItemComponent key={`${item.name}-${index}`} {...item} />
  ))

  return <Row>{optionItems}</Row>
}