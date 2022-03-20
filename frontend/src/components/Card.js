import { FaRegFolder, FaRegFileAlt, FaRegFileImage, FaRegFileAudio, FaRegFileVideo, FaRegFileCode, FaRegQuestionCircle } from 'react-icons/fa'
import { BsArrow90DegUp } from 'react-icons/bs'
import { FiDownload } from 'react-icons/fi'

const Card = ({ item, setActualPath, downloadItem }) => {
  const {name, is_dir, mime_type} = item

  const getIconFromMimeType = mime => {
    switch (mime.split('/')[0]) {
      case 'folder':
        return <FaRegFolder className='card-icon' />

      case 'text':
        return <FaRegFileAlt className='card-icon' />

      case 'image':
        return <FaRegFileImage className='card-icon' />

      case 'audio':
        return <FaRegFileAudio className='card-icon' />

      case 'video':
        return <FaRegFileVideo className='card-icon' />

      case 'application':
        return <FaRegFileCode className='card-icon' />

      default:
        return <FaRegQuestionCircle className='card-icon' />
    }
  }

  const chagePath = () => {
    setActualPath(prev => `${prev}${name}/`)
  }
 
  return (
    <div className={`card ${is_dir ? 'dir-card' : ''}`} onDoubleClick={is_dir ? chagePath : null} >
      <div>
        {getIconFromMimeType(mime_type)}
        <p className='card-title'>{name}</p>
      </div>

      <FiDownload className='card-icon-small download-icon grow' onClick={() => downloadItem(is_dir, name)}/>
    </div>
  )
}

const UpDirCard = ({ setActualPath, disabled }) => {
  const chagePath = () => {
    setActualPath(prev => {
      let newPath = prev.slice(0, -1).split('/').slice(0, -1).join('/')

      if (newPath !== '') {
        newPath += '/'
      }

      return newPath
    })
  }
 
  return (
    <div className={`card ${disabled ? 'disabled-card' : 'dir-card'}`} onDoubleClick={chagePath} style={{marginBottom: '2rem'}} >
      <div>
        <BsArrow90DegUp className='card-icon-small' />
        <p className='card-title'>Up a directory</p>
      </div>
    </div>
  )
}

export {Card, UpDirCard}