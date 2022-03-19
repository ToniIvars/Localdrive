import { MdOutlineCloudUpload } from 'react-icons/md'

const UploadButton = () => {
  return (
    <button className='btn btn-success'>
        <MdOutlineCloudUpload id='upload-icon' width='2em' height='2em' />
        <span>Upload</span>
    </button>
  )
}

export default UploadButton