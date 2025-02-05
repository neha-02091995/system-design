import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from './reducer/counter';
import {RootState} from './store'

const Counter:React.FC = () => {
    const count=useSelector((state: RootState)=>state.counter.count);
    const dispatch=useDispatch();
  return (
    <div>
        <button onClick={()=>dispatch(incrementCount())}>+</button>
        {count}
        <button onClick={()=>dispatch(decrementCount())}>-</button>
    </div>
  )
}

export default Counter
