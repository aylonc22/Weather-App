import React from "react";
import './Navbar.css'
export const Navbar = props=>{
    return(
        <div className="navbar">
            <div className ="world">world</div>
            <div className = "show">
                <div className = "show label">show</div>
                <div className = "show label button">weather</div>
                <div className = "show label button">wind</div>
                <div onClick = {()=>props.project("ProjectFlat")}>2D</div>
                <div onClick = {()=>props.project("Project3D")}>3D</div>
            </div>
            <div className ="project">
                
            </div>
        </div>
    )
}