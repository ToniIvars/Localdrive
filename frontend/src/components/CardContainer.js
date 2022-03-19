import Card from './Card'
import {v4 as uuid} from 'uuid'

const CardContainer = ({ items }) => {
  return (
    <div id='card-container'>
        {items.map(item => <Card key={uuid()} item={item} />)}
    </div>
  )
}

export default CardContainer