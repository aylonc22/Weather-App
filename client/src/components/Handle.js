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
            <Navbar project={(p)=>setProject(p)} setSelectedCountry={(country=>setSelectedCountry(country))}/>
            <div className ="globeAndCard">
                <Globe data={data} project={project} enableRotation={enableRotation} setSelectedCountry={(country=>setSelectedCountry(country))}/>
                {selectedCountry!==null?<DataCard details={data["details"]} country={selectedCountry}/>:null}
            </div>
        </div>
    )
}
export default Handle;