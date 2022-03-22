import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'
import { MkdirForm } from './components/Forms'
import Notification from './components/Notification'

const apiToken = process.env.REACT_APP_USER_TOKEN
const api = new Api(apiToken)

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')
  const [form, setForm] = useState('')
  const [notification, setNotification] = useState({})

  // List dir
  const listDir = () => api.listDir(actualPath).then(json => setDirItems(json))

  // Initial file listing
  useEffect(() => {
    listDir()

    return () => setDirItems([])

  }, [actualPath])

  // Download file or zipped folder
  const downloadItem = (isDir, itemName) => {
    api.download(actualPath, itemName).then(data => fileDownload(data, `${itemName}${isDir ? '.zip' : ''}`))
  }

  // Make a directory
  const makeDirectory = dirName => {
    api.mkdir(actualPath, dirName)
      .then(data => {
        console.log(data.detail)
        setNotification({message: data.detail, status: 'success'})
        listDir()
      })
      .catch(e => {
        console.log(e.detail)
        setNotification({message: e.detail, status: 'error'})
      })
  }

  return (
    <>
      {form === 'mkdir' && <MkdirForm makeDirectory={makeDirectory} setForm={setForm} />}
      <Header setForm={setForm} />
      {Object.keys(notification).length !== 0 && <Notification message={notification.message} status={notification.status} setNotification={setNotification} />}
      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath} downloadItem={downloadItem} />
    </>
  );
}

export default App;
