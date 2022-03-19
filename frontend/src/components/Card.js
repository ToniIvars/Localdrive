import { FaRegFolder, FaRegFileAlt, FaRegFileImage, FaRegFileAudio, FaRegFileVideo, FaRegFileCode, FaRegQuestionCircle } from 'react-icons/fa'
import  { HiOutlineDotsVertical } from 'react-icons/hi'

const Card = ({ item }) => {
  // eslint-disable-next-line
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

  return (
    <div className='card'>
      <div>
        {getIconFromMimeType(mime_type)}
        <p className='card-title'>{name}</p>
      </div>

      <HiOutlineDotsVertical className='card-icon' />
    </div>
  )
}

export default Card