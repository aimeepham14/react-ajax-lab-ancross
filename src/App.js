import { useEffect, useState } from 'react'
import './App.css';
import DisplayCards from './DisplayCards';

function App() {

    const [data, setData] = useState({villagers: []})
    const [search, setSearch] = useState('')
    const [faves, setFaves] = useState([])

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({villagers: rdata})
        console.log('Villager Data:', rdata)
      })
  }, [])

  const villagerList = data.villagers.map((villager, i) => {
    return <li>{villager.name['name-USen']}</li>
  })

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleClick = (villager) => {
    const newFaves = [...faves]
    const newData = [...data.villagers]
    const dataIndex = newData.indexOf(villager)
    const faveIndex = newFaves.indexOf(villager)
    if (faveIndex < 0) {
      newFaves.push(villager)
      newData.splice(villager, 1)
    } else {
      newFaves.splice(faveIndex, 1)
    }
    setFaves(newFaves)
    setData({villagers: newData})
  }


const getFilteredVillagers = (e) => {
  let searchTerm = search.toLowerCase()
  return data.villagers.filter(v => {
    let lowerCaseName = v.name['name-USen'].toLowerCase()
    return lowerCaseName.includes(searchTerm)
  })
}


  return (
    <div className="App">
    <div>
      <label htmlFor="villager-search">Search for a villager:</label>
      <input 
        id="villager-search" 
        type="text" 
        value={search} 
        onChange={handleChange}
      />
      <div>
        <h1>Favorite Villagers:</h1>
        <DisplayCards 
        villagers={faves}
        handleClick={handleClick}
        />
      </div>
    </div>
    <h2>
      All Villagers
    </h2>
    <DisplayCards villagers={getFilteredVillagers()} handleClick={handleClick} />
  </div>
  )
}

export default App;