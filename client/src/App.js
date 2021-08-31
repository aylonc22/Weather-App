import React,{useState,useEffect} from 'react'
import background from './bright_day.jpg';
import weatherCodes from './weatherCode.json';
import './App.css';

function App() {
  const [country,setCountry] = useState("");
  const [data,setData] =useState(null);
  const [search,setSearch] = useState(false);
  
  async function getWether(url){
    console.log("data"); 
    const response = await fetch(url);
    var data = await response.json(); 
    if(data.cod==="404")
        setData("404");
      else
        setData(data);
    }

useEffect(()=>fetch("https://api.ipify.org?format=json").then(res=>res.json()).then(
  json=>fetch(`https://geolocation-db.com/json/${process.env.REACT_APP_Gkey}/${json.ip}`).then(res=>res.json())).then(location=>
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country_name}&appid=${process.env.REACT_APP_Wkey}`).then(res=>res.json())
  .then(data=>setData(data))),[])
useEffect(()=>{
  if(search)
  {    
    getWether(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_Wkey}`);
    setSearch(false);
  }
 // eslint-disable-next-line 
},[search])
console.log(data);
  return (
    <div className="App">
     {data!==null && data!=="404"?<div className ="card"> 
     <input onKeyDown = {(e)=>{if(e.key==="Enter")setSearch(true);}} className ="inputCountry" type = "text" onChange={(e)=>setCountry(e.target.value)} placeholder="type city name to find weather forecast"/>     
     <div className="country">{data.sys.country}</div>
     <div className="city">{data.name}</div>     
     <div className="main">
     <div className="mainItem">{`feels like ${data.main.feels_like}`}</div>
     <div className="mainItem">{`humidity ${data.main.humidity}`}</div>
     <div className="mainItem">{`temp ${data.main.temp}`}</div>
     <div className="mainItem">{`temp max ${data.main.temp_max}`}</div>
     <div className="mainItem">{`temp min ${data.main.temp_min}`}</div>
     </div>     
      </div>:data==="404"?<div className ="card">404</div>:<div className ="card"></div>}
      <img className="backgroundImage" src={background} alt=""/>
     <div> </div>
    </div>
  );
}

export default App;
