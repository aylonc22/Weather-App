import React,{useState,useEffect} from 'react';
import './Globe.css';
import  ProjectFlat  from '../Projects/ProjectFlat.js';
import Project3D from '../Projects/Project3D.js';
const Globe = ({data, project, enableRotation,setSelectedCountry})=>{                
    const width = 1200;
    const height = 700;
    project==="ProjectFlat"?ProjectFlat(data,width,height,setSelectedCountry):Project3D(data,enableRotation);   
    if(!data)
   return(<div className ="loading"> 
    loading
    </div>); 
    else         
        return(<svg className ="globe" width={width} height={height}  >       
    </svg>);    
   
}

export default Globe;