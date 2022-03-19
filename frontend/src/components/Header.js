import { useEffect, useState } from 'react'
import UploadButton from './UploadButton'
import logo from '../logo.svg'

const Header = () => {
  const [bigWidth, setBigwidth] = useState(window.innerWidth > 500)

  const handleResize = () => setBigwidth(window.innerWidth > 500)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <header id="navbar">
      <div id="logo-container">
        <img src={logo} alt="Logo" id="logo" />
        {bigWidth && <h1>Local Drive</h1>}
      </div>
      <UploadButton />
    </header>
  )
}

export default Header