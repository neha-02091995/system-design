import {useState} from 'react'
import "./style.css"

const Newcomment = ({addCommentHanlder, parentId}) => {
    const [text, setText]=useState('')

    const addComment=()=>{
      addCommentHanlder(text, parentId);
      setText('')
    }
  return (
    <div className='new-comment-conatiner'>
      <textarea className="new-comment" placeholder='Add comments...' rows={3} cols={100} value={text} onChange={(e)=>setText(e.target.value)}/>
      <button className="new-comment add-comment" onClick={addComment}>Add</button>
    </div>
  )
}

export default Newcomment
