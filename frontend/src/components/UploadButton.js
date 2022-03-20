import { MdOutlineCloudUpload } from 'react-icons/md'

const UploadButton = () => {
  return (
    <button className='btn btn-success'>
        <MdOutlineCloudUpload className='btn-icon' />
        <span>Upload</span>
    </button>
  )
}

export default UploadButton