import React,{useState} from "react";
import Globe from "./Globe/Globe";
import { Navbar } from "./Navbar/Navbar";
const Handle = ({data})=>{
    const [project,setProject] = useState("Project3D");
  const [enableRotation,setEnableRotation] = useState(true);
  const [width,setWidth] = useState(window.innerWidth);// def 960
  const [height,setHeight] = useState(window.innerHeight -64); // def 500
    return(        
        <div className="handle">
            <Navbar project={(p)=>setProject(p)}/>
            <Globe data={data} project={project} enableRotation={enableRotation} width={width} height={height}/>
        </div>
    )
}
export default Handle;