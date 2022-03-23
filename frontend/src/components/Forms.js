import { useState } from 'react'
import { BsCheckLg, BsXLg } from 'react-icons/bs'

const MkdirForm = ({ makeDirectory, setForm }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [animation, setAnimation] = useState('zoom-in')

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '') {
      setError('Name cannot be empty')
    } else {
      setForm('')
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
        <input type='text' autoFocus={true} placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
      </div>

      <div className='form-btn-container'>
        <div style={{marginRight: '1rem'}} className='btn btn-danger' onClick={cancel}>
          <BsXLg className='btn-icon' />
          Cancel
        </div>
        <button type='submit' className='btn btn-success' onClick={onSubmit}>
          <BsCheckLg className='btn-icon' />
          Create folder
        </button>
      </div>
    </form>
  )
}

export {MkdirForm}