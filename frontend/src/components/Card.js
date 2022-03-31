import { useState } from 'react'
import { FaRegFolder, FaRegFileAlt, FaRegFileImage, FaRegFileAudio, FaRegFileVideo, FaRegFileCode, FaRegQuestionCircle } from 'react-icons/fa'
import { BsArrow90DegUp } from 'react-icons/bs'
import { HiDotsVertical } from 'react-icons/hi'
import { FiDownload, FiEdit, FiTrash } from 'react-icons/fi'

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

const Card = ({ item, setActualPath, downloadItem, editItem, deleteItem }) => {
  const {name, is_dir, mime_type} = item

  const [dropdown, setDropdown] = useState(false)
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState(name)
  const [error, setError] = useState('')
  const [animation, setAnimation] = useState('dropdown-entrance')

  const chagePath = () => {
    setActualPath(prev => `${prev}${name}/`)
  }

  const toggleDropdown = () => {
    !dropdown ? setAnimation('dropdown-entrance') : setAnimation('dropdown-exit')

    if (dropdown) {
      setTimeout(() => {
        setDropdown(prev => !prev)
      }, 450)
    } else {
      setDropdown(prev => !prev)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (newName === '') {
      setError('Name cannot be empty')
    } else {
      setEditing(false)
      editItem(name, newName)
    }
  }

  return (
    <div className={`card ${is_dir ? 'dir-card' : ''}`} onDoubleClick={is_dir ? chagePath : null} >
      <div className={editing ? 'editing-card' : undefined}>
        {getIconFromMimeType(mime_type)}
        {editing ?
          <form className='edit-form' onSubmit={onSubmit}>
            <input type="text" placeholder='New name' value={newName} onChange={e => setNewName(e.target.value)}/>
            <span className='edit-form-error'>{error}</span>
          </form> :

          <p className='card-title'>{name}</p>
        }
      </div>

      <div className='dropdown'>
        <HiDotsVertical className='card-icon-small dropdown-btn' onClick={toggleDropdown} />
        {dropdown && 
          <div className={`dropdown-content ${animation}`}>
            <button className='download-btn' onClick={() => {
              downloadItem(is_dir, name)
              setDropdown(false)
            }}>
              <FiDownload className='dropdown-icon' />
              Download
            </button>

            <button className='edit-btn' onClick={() => {
              setEditing(prev => !prev)
              setNewName(name)
              setError('')
              setDropdown(false)
            }}>
              <FiEdit className='dropdown-icon' />
              Edit
            </button>

            <button className='delete-btn' onClick={() => {
              deleteItem(name)
              setDropdown(false)
            }}>
              <FiTrash className='dropdown-icon' />
              Delete
            </button>
          </div>
        }
      </div> 
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
    <div className={`card up-dir-card ${disabled ? 'disabled-card' : 'dir-card'}`} onDoubleClick={chagePath} >
      <div>
        <BsArrow90DegUp className='card-icon-small' />
        <p className='card-title'>Go a directory up</p>
      </div>
    </div>
  )
}

export {Card, UpDirCard}