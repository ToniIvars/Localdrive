import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import Notification from '../components/Notification'

const makeRequest = async (username, password, apiRoute) => {
  return axios.post(`${process.env.REACT_APP_API_URL}${apiRoute}`, {
    username: username,
    password: password
  })
  .then(response => response.data)
  .catch(error => {throw error.response.data})
}

export default function LoginRegister({buttonContent, apiRoute, linkTo}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({})
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.hasOwnProperty('token')) {
      setAuthenticated(true)  
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    // Call the api login
    makeRequest(username, password, apiRoute)
      .then(data => {
        const token = data.token

        // Save token in the localStorage
        localStorage.setItem('token', token);
        setAuthenticated(true)
      })
      .catch(e => {
        setNotification({message: e.detail, status: 'error'})
      })
  }

  return (
    <>
    {authenticated && <Navigate to='/' replace={true} />}

    {Object.keys(notification).length !== 0 && <Notification message={notification.message} status={notification.status} setNotification={setNotification} />}
    <div className='container-center'>
      <div className='form-center'>
        <Header />
        <form className='login-form' onSubmit={onSubmit}>
          <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} required />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />

          <button type='submit' className='btn btn-success'>{buttonContent}</button>

          {linkTo === 'login' ? <Link to='/login'>Already have an account? Login now</Link>
          :  <Link to='/register'>Don't have an account yet? Register now</Link>}
        </form>
      </div>
    </div>
    </>
  )
}