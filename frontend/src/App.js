import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'

const apiToken = process.env.REACT_APP_USER_TOKEN
const api = new Api(apiToken)

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')

  useEffect(() => {
    api.listDir(actualPath).then(json => setDirItems(json))
   
    return () => setDirItems([])

  }, [actualPath])

  const downloadItem = (isDir, itemName) => {
    if (isDir) {
      api.downloadDir(actualPath + itemName).then(data => fileDownload(data, `${itemName}.zip`))
    } else {
      api.downloadFile(itemName, actualPath).then(data => fileDownload(data, itemName))
    }
  }

  return (
    <>
      <Header />
      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath} downloadItem={downloadItem} />
    </>
  );
}

export default App;
