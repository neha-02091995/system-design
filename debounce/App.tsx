import { useState, useCallback } from 'react'

import './App.css'
import Searchbar from './components/searchbar';
import { getSuggestions } from './api';
import { useDebounce } from './util/debounce';

function App() {

  const [suggestions, setSuggestions]=useState([])


  const onChange = (value: string): void => {
    try{
    if (value.length > 1) {
      getSuggestions(value).then(({products}) => {
        const result: any[] = products.filter(item=>item.title.toLowerCase().includes(value.toLowerCase()))
        setSuggestions(result.map(item=>item.title))
        
      })
    } else {
      setSuggestions([])
    }
  }catch(err:any){
    alert(err.error.messgae)
    throw err
  }
  }
  const debounceChangeHandler = useCallback(useDebounce(onChange,500),[])
  return (
    <>
      <h1>Search bar</h1>
      <Searchbar placeholder='Search fruits' onChange={debounceChangeHandler} suggestions={suggestions}/>
      
    </>
  )
}

export default App
