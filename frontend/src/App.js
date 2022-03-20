import { useState, useEffect } from 'react'
import Api from './api/Api'
import Header from './components/Header'
import CardContainer from './components/CardContainer'

const apiToken = process.env.REACT_APP_USER_TOKEN
const api = new Api(apiToken)

function App() {
  const [dirItems, setDirItems] =  useState([])
  const [actualPath, setActualPath] = useState('')

  useEffect(() => {
    api.list_dir(actualPath).then(json => setDirItems(json))
   
    return () => setDirItems([])

  }, [actualPath])

  return (
    <>
      <Header />
      <CardContainer items={dirItems} actualPath={actualPath} setActualPath={setActualPath} />
    </>
  );
}

export default App;
