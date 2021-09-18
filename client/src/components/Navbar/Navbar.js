import React, { useState } from "react";
import './Navbar.css'
export const Navbar = props=>{
   const [clicked,setClicked] = useState(false);
   const [country,setCountry] = useState("");  
    return(
        <div className="navbar">
           <div className ="components">
                <div  className={clicked?"containerClicked":"container"} onBlur={()=>setClicked(false)} onClick={()=>clicked?setClicked(false):setClicked(true)}>
                <input id="input" value={country} className={clicked?"searchClicked":"search"} onChange={(e)=>setCountry(e.target.value)} onKeyUp={(e)=>e.key==="Enter"?setCountry(""):null} type="text" placeholder="enter a country"/>
                <div className="button"><img className="search-icon" id="button" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt=""
                onClick={()=>setCountry("")}/></div>
                </div>
                <div className="func" id="recenter">recenter map</div>
                <div className="func" id="random">random country</div>
            </div>
        </div>
    )
}