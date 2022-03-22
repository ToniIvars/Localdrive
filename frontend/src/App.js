import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'
import { MkdirForm } from './components/Forms'

const apiToken = process.env.REACT_APP_USER_TOKEN
const api = new Api(apiToken)

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')
  const [form, setForm] = useState('')

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
        listDir()
      })
      .catch(e => console.log(e.detail))
  }

  return (
    <>
      {form === 'mkdir' && <MkdirForm makeDirectory={makeDirectory} setForm={setForm} />}
      <Header setForm={setForm} />
      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath} downloadItem={downloadItem} />
    </>
  );
}

export default App;
