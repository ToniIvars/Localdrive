import {Card, UpDirCard, DeleteCard} from './Card'
import ModeSelect from './ModeSelect'
import {v4 as uuid} from 'uuid'

const CardContainer = ({ items, actualPath, setActualPath, downloadItem, deleteItem, mode, setMode}) => {
  const mapItems = item => {
    if (mode === 'download') {
      return <Card key={uuid()} item={item} setActualPath={setActualPath} downloadItem={downloadItem} />
    } else if (mode === 'delete') {
      return <DeleteCard key={uuid()} item={item} setActualPath={setActualPath} deleteItem={deleteItem} />
    }
  }

  return (
    <div id='card-container'>
      <p id='actual-path'>Actual path: {actualPath}</p>
      <div id='updir-mode-container'>
        <UpDirCard key={uuid()} setActualPath={setActualPath} disabled={actualPath === ''} />
        <ModeSelect setMode={setMode} />
      </div>

      {items.map(mapItems)}
    </div>
  )
}

export default CardContainer