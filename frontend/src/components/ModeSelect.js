import { useState } from 'react'

const ModeSelect = ({ setMode }) => {
  const [option, setOption] = useState('download')
  const [selectClass, setSelectClass] = useState('download-option')

  const onChange = (e) => {
    let newValue = e.target.value

    setOption(newValue)
    setSelectClass(`${newValue}-option`)
    setMode(newValue)
  }

  return (
    <select value={option} onChange={onChange} className={selectClass}>
      <option value='download'>Download</option>
      <option value='delete'>Delete</option>
    </select>
  )
}

export default ModeSelect