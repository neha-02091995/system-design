import React, {useEffect, useRef, useState} from 'react';
import Cards from './cards';
import styles from './cards.module.css'

function App(){
  const [petList, setPetList]=useState([]);
  const [pageIndex, setPageIndex]=useState(1);
  const lastPetRef = useRef(null);

  const observer = new IntersectionObserver((entries)=>{
    console.log(entries)
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        populatePetList(pageIndex)
      }
    })
  },{
    threshold:0.5
  })

  const populatePetList= async (pageIndex:number)=>{
    const url=`http://localhost:3001/pets?_page=${pageIndex}&_limit=10`;
    observer.disconnect()
    fetch(url).then(res=>res.json()).then(data=>{
      setPetList([...petList,...data]);
      setPageIndex(pageIndex+1)
    })
  }
  useEffect(()=>{
    populatePetList(pageIndex)
  },[])

  useEffect(()=>{
    console.log('pageInsdex changes');
  },[pageIndex])

  useEffect(()=>{

    if(lastPetRef.current){
      console.log(lastPetRef.current)
      observer.observe(lastPetRef.current)
    }
  },[petList])

  return <>
    <h1>Pets</h1>
    <div className={styles.gridComponent}>
      {petList.map((pet,i)=><div ref={i===petList.length-1?lastPetRef:null} className={styles.cardContainer}><Cards card={pet}/></div>)}

    </div>
  </>
};

export default App;