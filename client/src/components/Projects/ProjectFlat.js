import React, { useState, useEffect} from 'react';
import './Project.css';
import renderMap from '../d3/renderMap';

 const ProjectFlat = (data,width,height) =>{
    //const [rotation,setRotation] = useState(0);     
    useEffect(()=>{
  if(data)
        {
           
          renderMap(data,width,height)       
        }
    })   
};

export default ProjectFlat;