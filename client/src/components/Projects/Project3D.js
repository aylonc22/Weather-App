import React, { useState, useEffect} from 'react';
import renderGlobe from '../d3/renderGlobe';
import './Project.css';
 const Project3D = (data,enableRotation) =>{
        const [width, setWidth] = useState(window.innerWidth)
        const [height, setHeight] = useState(window.innerHeight -64)

        const updateWidthAndHeight = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight - 64)
        }        
    useEffect(()=>{        
        if(data)
                {         
                    window.addEventListener('resize', updateWidthAndHeight)
                    updateWidthAndHeight();                            
                    let newTimer = renderGlobe(data,enableRotation,width,height);   
                    return () => {
                        if (newTimer) {
                          newTimer.stop();                          
                        }
                      }    
                }
            })   
};

export default Project3D;