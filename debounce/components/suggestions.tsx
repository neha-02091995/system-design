import './suggestions.css';
interface Suggestions {
    suggestionList: string[],
    searchText: string
}

const Suggestions:React.FC<Suggestions> = ({suggestionList, searchText}) => {
    const formText = (text: string, searchText: string)=>{
        const index=text.toLowerCase().indexOf(searchText.toLowerCase());
        return <>{text.slice(0,index)}<b>{text.slice(index, index+searchText.length)}</b>{text.slice(index+searchText.length, text.length)}</>
    }

  return (
    <div className='suggestion-container'>
      <ul>
        {suggestionList.map(item=><li key={item}>{formText(item, searchText)}</li>)}
      </ul>
    </div>
  )
}

export default Suggestions
