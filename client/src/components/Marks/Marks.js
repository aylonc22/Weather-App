import React, { useState, useEffect} from 'react';
import { geoOrthographic,geoEqualEarth , geoPath, geoGraticule, select,zoom } from 'd3';
import './Marks.css';

const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();
    /**
     * The callback function is automatically passed a timestamp indicating
     * the precise time requestAnimationFrame() was called.
     */
  
    React.useEffect(() => {
      const animate = time => {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current;
          callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
      };
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  };

export const Marks = ({ data: {land, interiors} }) =>{
    const [rotation,setRotation] = useState(0);     
    useAnimationFrame(()=>setRotation(r=>r+0.2))          
    const projection = geoOrthographic().rotate([rotation]);
    const path = geoPath(projection);
    const graticule = geoGraticule();
    return(
        <g className ="marks">
         <path className="sphere" d={path({type:"Sphere"})}/>
         <path className="graticules" d={path(graticule())}/> 
         {land.features.map(feature=>(<path className="land" d={path(feature)}/>))}
        <path className="interiors" d={path(interiors)}/>         
         </g>);
};