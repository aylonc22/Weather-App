import React,{useEffect, useState} from "react";
import DataCard from "./DataCard/DataCara";
import Globe from "./Globe/Globe";
import { Navbar } from "./Navbar/Navbar";
const Handle = ({data})=>{
    const [project,setProject] = useState("ProjectFlat");
  const [enableRotation,setEnableRotation] = useState(false); 
  const [selectedCountry,setSelectedCountry] = useState(null);    
  return(        
        <div className="handle">            
            <div className ="globeAndCard">
            {selectedCountry!==null?<DataCard details={data["details"]} country={selectedCountry}/>:<div  className ="dataCard" style={{backgroundImage:`url('https://source.unsplash.com/1600x900/?${data["data"].features[Math.floor(Math.random() * data["data"].features.length)].properties.name}`}}>
        <Navbar/></div>}
                <Globe data={data} project={project} enableRotation={enableRotation} setSelectedCountry={(country=>setSelectedCountry(country))}/>
                
            </div>
        </div>
    )
}
export default Handle;