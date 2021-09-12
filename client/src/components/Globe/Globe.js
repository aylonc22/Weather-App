import React,{useState,useEffect} from 'react';
import './Globe.css';
import  ProjectFlat  from '../Projects/ProjectFlat.js';
import Project3D from '../Projects/Project3D.js';
const Globe = ({data, project, enableRotation,
    width,height})=>{                
    project==="ProjectFlat"?ProjectFlat(data,width,height):Project3D(data,enableRotation)
    if(!data)
   return(<div>
    loading
    </div>); 
    else         
        return(<svg className ="globe" height={height} width={width}>       
    </svg>);    
   
}

export default Globe;