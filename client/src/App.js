import React,{useState,useEffect} from 'react'
import { useData } from './components/useData.js';
import './App.css';
import Handle from './components/Handle.js';



function App() {
  const data = useData();   
  return (
    <div className="App"> 
    <div className='stars'></div>
    <div className='twinkling'></div>
    <Handle data={data}/>   
    </div>
  );
}

export default App;
