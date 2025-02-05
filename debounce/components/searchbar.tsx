import { useEffect, useState } from "react";
import SuggestionList from "./suggestions";
import './searchbar.css';

interface SearchbarProps {
  placeholder: string;
  onChange: (value: string) => void;
  suggestions: string[]
}

const Searchbar: React.FC<SearchbarProps> = ({ placeholder, onChange, suggestions }) => {
  const [value, setValue] = useState("");

  
  useEffect(()=>{
    onChange(value)
  },[value])


  return (
    <>
      <input
        placeholder={placeholder}
        onChange={(event)=>setValue(event.target.value)}
        className='inputbar'
      />
      {suggestions.length>0 && <SuggestionList suggestionList={suggestions} searchText={value}/>}
    </>
  );
};

export default Searchbar;
