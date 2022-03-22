import { MdOutlineCloudUpload } from 'react-icons/md'
import { BiFolderPlus } from 'react-icons/bi'

const UploadButton = () => {
  return (
    <button className='btn btn-success'>
        <MdOutlineCloudUpload className='header-btn-icon' />
        <span className='hide-when-small'>Upload</span>
    </button>
  )
}

const MkdirButton = ({ setForm }) => {
  return (
    <button className='btn btn-success' onClick={() => setForm('mkdir')} style={{marginRight: '1rem'}}>
        <BiFolderPlus className='header-btn-icon' />
        <span className='hide-when-small'>New folder</span>
    </button>
  )
}

export {UploadButton, MkdirButton}