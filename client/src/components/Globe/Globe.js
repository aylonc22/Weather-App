import React,{useState,useEffect} from 'react';
import './Globe.js';
import { useData } from '../useData.js';
import { Marks } from '../Marks/Marks.js';
const Globe = props=>{
    const data = useData();    
    // console.log(data);

   if(!data)
   return(<div>
    loading
    </div>);  
   return(<svg  width="960" height="500">
       <Marks data={data}/>
    </svg>);
}

export default Globe;