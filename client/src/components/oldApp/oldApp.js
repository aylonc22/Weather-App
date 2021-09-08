import React,{useState,useEffect} from 'react'
import background from './bright_day.jpg';
import weatherCodes from './weatherCode.json';
import p01d from './icons/01d.png';
import p01n from './icons/01n.png';
import p02d from './icons/02d.png';
import p02n from './icons/02n.png';
import p03d from './icons/03d.png';
import p03n from './icons/03n.png';
import p04d from './icons/04d.png';
import p04n from './icons/04n.png';
import p09d from './icons/09d.png';
import p09n from './icons/09n.png';
import p10d from './icons/10d.png';
import p10n from './icons/10n.png';
import p11d from './icons/11d.png';
import p11n from './icons/11n.png';
import p13d from './icons/13d.png';
import p13n from './icons/13n.png';
import p50d from './icons/50d.png';
import p50n from './icons/50n.png'; 
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
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country_name}&appid=${process.env.REACT_APP_Wkey}&units=metric`).then(res=>res.json())
  .then(data=>setData(data))),[])
useEffect(()=>{
  if(search)
  {    
    getWether(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_Wkey}&units=metric`);
    setSearch(false);
  }
 // eslint-disable-next-line 
},[search]);

const getLocalDate = offset =>{
  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    return new Date(utc + (3600000*offset));
}

const getIcon = id=>
{
  if(id==="01d")
    return p01d;
  if(id==="01n")
    return p01n;
  if(id==="02d")
    return p02d;
  if(id==="02n")
    return p02n;
  if(id==="03d")
    return p03d;
  if(id==="03n")
    return p03n;
  if(id==="04d")
    return p04d;
  if(id==="04n")
    return p04n;
  if(id==="09d")
    return p09d;
  if(id==="09n")
    return p09n;
  if(id==="10d")
    return p10d;
  if(id==="10n")
    return p10n;
  if(id==="11d")
    return p11d;
  if(id==="11n")
    return p11n;
  if(id==="13d")
    return p13d;
  if(id==="13n")
    return p13n;
  if(id==="50d")
    return p50d;
  if(id==="50n")
    return p50n;
}

const getBackground = theme=>
{
  if(theme === "Rain")
    return {backgroundColor:'#005BEA'};
  if(theme === "Clear")
    return {backgroundColor:'#f7b733'};
  if(theme === "Thunderstorm")
    return {backgroundColor:'#616161'};
  if(theme === "Clouds")
    return {backgroundColor:'#1F1C2C'};
  if(theme === "Snow")
    return {backgroundColor:'#00d2ff'};
  if(theme === "Drizzle")
    return {backgroundColor:'#076585'};
  if(theme === "Haze")
    return {backgroundColor:'#66A6FF'};
  if(theme === "Mist")
    return {backgroundColor:'#3CD3AD'};
  if(theme === "Sand")
    return {backgroundColor:'#3CD3AD'};
  if(theme === "Dust")
    return {backgroundColor:'#3CD3AD'};
  if(theme === "Ash")
    return {backgroundColor:'#3CD3AD'};
  if(theme === "Squall")
    return {backgroundColor:'#3CD3AD'};
  if(theme === "Tornado")
    return {backgroundColor:'#3CD3AD'};                     
}
console.log(data)
  return (
    <div className="App">
     {data!==null && data!=="404"?<div className ="card" style ={getBackground(data.weather[0].main)}> 
     <input onKeyDown = {(e)=>{if(e.key==="Enter")setSearch(true);}} className ="inputCountry" type = "text" onChange={(e)=>setCountry(e.target.value)} placeholder="type city name to find weather forecast"/>     
     <div className="country">{data.sys.country}</div>
     <div className="city">{data.name}</div> 
     <div>{getLocalDate(data.timezone/60/60).toDateString()}</div>    
     <div className="main">
     <div className="mainItem">{`feels like ${Math.round(data.main.feels_like)}°`}</div>
     <div className="mainItem">{`humidity ${data.main.humidity}%`}</div>      
     <div className="mainItem">{` ${Math.round(data.main.temp_min)}°/${Math.round(data.main.temp_max)}°`}</div>
     <div>{weatherCodes.codes.filter((f)=>f.ID == data.weather[0].id)[0].Description}</div>
     <img alt ="" src={getIcon(data.weather[0].icon)} />
     </div>     
      </div>:data==="404"?<div className ="card">404</div>:<div className ="card"></div>}
      {/* <img className="backgroundImage" src={background} alt=""/> */}
     <div> </div>
    </div>
  );
}

export default App;
