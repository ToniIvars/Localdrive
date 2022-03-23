import {UploadButton, MkdirButton} from './HeaderButtons'
import logo from '../logo.svg'

const Header = ({ setForm }) => {
  return (
    <header id="navbar">
      <div id="logo-container">
        <img src={logo} alt="Logo" id="logo" />
        <h1>Local Drive</h1>
      </div>
      <div id='header-btn-container'>
        <MkdirButton setForm={setForm} />
        <UploadButton setForm={setForm} />
      </div>
    </header>
  )
}

export default Header