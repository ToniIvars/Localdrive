import {Card, UpDirCard} from './Card'
import {v4 as uuid} from 'uuid'

const CardContainer = ({ items, actualPath, setActualPath, downloadItem}) => {
  return (
    <div id='card-container'>
      <p id='actual-path'>Actual path: {actualPath}</p>
      <UpDirCard key={uuid()} setActualPath={setActualPath} disabled={actualPath === ''} />
      {items.map(item => <Card key={uuid()} item={item} setActualPath={setActualPath} downloadItem={downloadItem} />)}
    </div>
  )
}

export default CardContainer