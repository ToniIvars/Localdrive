import { useState } from 'react'
import { BsCheckLg, BsXLg } from 'react-icons/bs'
import { MdOutlineCloudUpload } from 'react-icons/md'

const MkdirForm = ({ makeDirectory, setForm }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [animation, setAnimation] = useState('zoom-in')

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '') {
      setError('Name cannot be empty')
    } else {
      cancel()
      setName('')
      setError('')
      makeDirectory(name)
    }
  }

  const cancel = () => {
    setAnimation('zoom-out')
    setTimeout(() => setForm(''), 1000);
  }

  return (
    <form className={`form ${animation}`} onSubmit={onSubmit}>
      <div className='form-control'>
        <label>New folder name: <p style={{color: '#DC3545', marginTop: '0.25rem'}}>{error}</p></label>
        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
      </div>

      <div className='form-btn-container'>
        <div style={{marginRight: '1rem'}} className='btn btn-danger' onClick={cancel}>
          <BsXLg className='form-btn-icon' />
          Cancel
        </div>
        <button type='submit' className='btn btn-success' onClick={onSubmit}>
          <BsCheckLg className='form-btn-icon' />
          Create folder
        </button>
      </div>
    </form>
  )
}

const UploadFileForm = ({ uploadFile, setForm }) => {
  const [file, setFile] = useState({})
  const [error, setError] = useState('')
  const [animation, setAnimation] = useState('zoom-in')
  const [fileName, setFileName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!fileName) {
      setError('File field cannot be empty')

    } else {
      cancel()
      setFile({})
      setError('')
      uploadFile(file)
    }
  }

  const cancel = () => {
    setAnimation('zoom-out')
    setTimeout(() => setForm(''), 1000);
  }

  return (
    <form className={`form ${animation}`} onSubmit={onSubmit}>
      <div className='form-control'>
        <label>File to upload: <p style={{color: '#DC3545', marginTop: '0.25rem'}}>{error}</p></label>

        {!fileName ?
          <label id='file-upload'>
            <input type='file' onChange={(e) => {
              setFileName(e.target.files[0].name)
              setFile(e.target.files[0])
            }}/>

            <MdOutlineCloudUpload id='file-upload-icon' />

            <p id='file-label'>Browse a file</p>
          </label>

        : <p id='filename'>
            <MdOutlineCloudUpload />
            {fileName}
          </p>
        }
      </div>

      <div className='form-btn-container'>
        <div style={{marginRight: '1rem'}} className='btn btn-danger' onClick={cancel}>
          <BsXLg className='form-btn-icon' />
          Cancel
        </div>
        <button type='submit' className='btn btn-success' onClick={onSubmit}>
          <BsCheckLg className='form-btn-icon' />
          Upload File
        </button>
      </div>
    </form>
  )
}

export {MkdirForm, UploadFileForm}