import {UploadButton, MkdirButton} from './HeaderButtons'
import logo from '../logo.svg'
import { MdLogout } from 'react-icons/md'

const Header = ({ setForm, logout }) => {
  return (
    <header id="navbar">
      <div id="logo-container">
        <img src={logo} alt="Logo" id="logo" />
        <h1>Local Drive</h1>
      </div>
      <div id='header-btn-container'>
        <MkdirButton setForm={setForm} />
        <UploadButton setForm={setForm} />
        <MdLogout id='logout-btn' onClick={logout} />
      </div>
    </header>
  )
}

export default Header