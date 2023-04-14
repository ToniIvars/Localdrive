import { useState } from 'react'
import { BsCheckLg, BsXLg } from 'react-icons/bs'

const Notification = ({ message, status, setNotification }) => {
  const [animation, setAnimation] = useState('fade-in')

  const getIcon = () => {
    if (status === 'success') {
      return <BsCheckLg className='notification-icon' />
    } else {
      return <BsXLg className='notification-icon' />
    }
  }

  const cancel = () => {
    setAnimation('back-out')
    setTimeout(() => setNotification({}), 600);
  }

  return (
    <div className={`notification notification-${status} ${animation}`} onClick={cancel}>{getIcon()}{message}</div>
  )
}

export default Notification