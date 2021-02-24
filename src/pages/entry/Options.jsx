import { useEffect, useState } from "react"
import axios from "axios"
import Row from "react-bootstrap/Row"

/* Components */
import ScoopOption from './ScoopOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(err => {
        // TODO: later
      })
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null // TODO: replace 'null' with ToppingOption when available

  const optionItems = items.map((item, index) => (
    <ItemComponent key={`${item.name}-${index}`} {...item} />
  ))

  return (
    <Row>
      {optionItems}
    </Row>
  )
}