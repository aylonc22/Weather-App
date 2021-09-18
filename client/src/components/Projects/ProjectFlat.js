import React, { useState, useEffect} from 'react';
import './Project.css';
import renderMap from '../d3/renderMap';

 const ProjectFlat = (data,width,height,setSelectedCountry) =>{      
    useEffect(()=>{
  if(data)
        {
           
          renderMap(data,width,height,setSelectedCountry)       
        }
    })   
};

export default ProjectFlat;