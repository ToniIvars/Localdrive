import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'
import { MkdirForm, UploadFileForm } from './components/Forms'
import Notification from './components/Notification'
import { useNavigate } from 'react-router-dom'

// Global declaration of api client
var api = new Api()

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')
  const [form, setForm] = useState('')
  const [notification, setNotification] = useState({})
  const [authenticated, setAuthenticated] = useState(localStorage.hasOwnProperty('token'))

  const navigate = useNavigate()

  // Initial logged-in checking
  useEffect(() => {
    if (!authenticated) {
      navigate('/login')

    } else {
      !api.apiToken && api.initiateClient(localStorage.getItem('token'))
    }

  }, [authenticated])

  // Log Out
  const logout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false)
  }

  // List dir
  const listDir = () => {
    api.listDir(actualPath)
      .then(json => setDirItems(json))
      .catch(error => {
        setNotification({message: (error === 'Network Error') ? 'The API could not be reached' : error, status: 'error'})
      })
  }

  // Initial file listing
  useEffect(() => {
    listDir()

    return () => setDirItems([])

  }, [actualPath])

  // Download file or zipped folder
  const downloadItem = (isDir, itemName) => {
    api.download(actualPath, itemName).then(data => fileDownload(data, `${itemName}${isDir ? '.zip' : ''}`))
  }

  // Delete file or folder
  const deleteItem = itemName => {
    api.delete(actualPath, itemName)
    .then(data => {
      setNotification({message: data.detail, status: 'success'})
      listDir()
    })
    .catch(e => {
      setNotification({message: e.detail, status: 'error'})
    })
  }

  // Edit file or folder
  const editItem = (itemName, newItemName) => {
    api.edit(actualPath, itemName, newItemName)
    .then(data => {
      setNotification({message: data.detail, status: 'success'})
      listDir()
    })
    .catch(e => {
      setNotification({message: e.detail, status: 'error'})
    })
  }

  // Make a directory
  const makeDirectory = dirName => {
    api.mkdir(actualPath, dirName)
      .then(data => {
        setNotification({message: data.detail, status: 'success'})
        listDir()
      })
      .catch(e => {
        setNotification({message: e.detail, status: 'error'})
      })
  }

  // Upload a new file
  const uploadFile = file => {
    api.uploadFile(actualPath, file)
    .then(data => {
      setNotification({message: data.detail, status: 'success'})
      listDir()
    })
    .catch(e => {
      setNotification({message: e.detail, status: 'error'})
    })
  }

  return (
    <>
      {form === 'mkdir' && <MkdirForm makeDirectory={makeDirectory} setForm={setForm} />}
      {form === 'upload' && <UploadFileForm uploadFile={uploadFile} setForm={setForm} />}

      <Header setForm={setForm} logout={logout} />

      {Object.keys(notification).length !== 0 && <Notification message={notification.message} status={notification.status} setNotification={setNotification} />}

      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath}
        downloadItem={downloadItem} deleteItem={deleteItem} editItem={editItem} />
    </>
  );
}

export default App;
