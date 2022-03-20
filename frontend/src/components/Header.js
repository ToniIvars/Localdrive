import UploadButton from './UploadButton'
import logo from '../logo.svg'

const Header = () => {
  return (
    <header id="navbar">
      <div id="logo-container">
        <img src={logo} alt="Logo" id="logo" />
        <h1>Local Drive</h1>
      </div>
      <UploadButton />
    </header>
  )
}

export default Header