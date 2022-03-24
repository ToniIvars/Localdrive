import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'
import { MkdirForm, UploadFileForm } from './components/Forms'
import Notification from './components/Notification'

const apiToken = process.env.REACT_APP_USER_TOKEN
const api = new Api(apiToken)

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')
  const [form, setForm] = useState('')
  const [notification, setNotification] = useState({})
  const [mode, setMode] = useState('download')

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
      <Header setForm={setForm} />
      {Object.keys(notification).length !== 0 && <Notification message={notification.message} status={notification.status} setNotification={setNotification} />}
      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath} downloadItem={downloadItem} deleteItem={deleteItem} mode={mode} setMode={setMode} />
    </>
  );
}

export default App;
