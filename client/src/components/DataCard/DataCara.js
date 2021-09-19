import React,{useState,useEffect} from "react";
import countries from 'countries-api';
import './DataCara.css'
import { Navbar } from "../Navbar/Navbar";
const DataCard = ({country,details})=>{
    const [image,setImage] = useState(null); 
    const [data,setData] = useState(null);
    const [temp,setTemp] = useState(null);  
    const [inCard,setIncard] = useState(null);
    const [error,setError] = useState(false);     
    useEffect(()=>{       
        if(data!==null && data!==undefined)
            {                
               //https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_Pkey}&text=${country.toLowerCase}&sort=interestingness-desc&per_page=3&license=4&format=json&nojsoncallback=1              
               setImage(`https://www.countryflags.io/${data.altSpellings[0]}/shiny/64.png`);
               
               //fetch(`http://api.fungenerators.com/fact/random?category=Countries&subcategory=${data.name.common}`).then(console.log)
            }
    },[data])   
    useEffect(()=>{
        const name = countries.findByName(country).data[0];
        const officialName = countries.findByOfficialName(country).data[0];              
        // let names = name!==undefined?{name:name.name.common,officialName:name.name.official}:undefined;
        // if(names===undefined)
        //    names = {name:officialName.name.common,officialName:officialName.name.official}           
        let valid = name===undefined?officialName:name;
        //console.log(valid);
        if(valid===undefined)
            setError(true);
        else
            {
                setError(false);
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${valid.latlng[0]}&lon=${valid.latlng[1]}&units=metric&lang=en&appid=${process.env.REACT_APP_Wkey}`).then(res=>res.json().then(res=>{
                    setTemp(res);           
                    setIncard(res.daily[0]);
                    setData(valid);          
                }));
            }                
    },[country]);
    const getLocalDate = (d) =>{       
          return new Date(d.dt * 1000).toLocaleString("en-GB", {timeZone: d.timezone,
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }       
    return (error?<div className ="dataCard" style={{backgroundImage:`url('https://source.unsplash.com/1600x900/?${country}`}}>
             <div className ="current">
             <div className="countryName">{country}</div>
             </div>
             <div className ="weekly">
                 <div className="board" style={{fontSize:"50px"}}>404</div>
             </div>
            
    </div>:<div  className ="dataCard" style={inCard!=null?{backgroundImage:`url('https://source.unsplash.com/1600x900/?${country}`}:null}>
        <Navbar/>
        <div className ="current">             
            <div className="part1">    
                <div className="left">
                    <div className="weekday">{inCard!=null?getLocalDate(inCard).split(',')[0]:null}</div>
                    <div className="date">{inCard!=null?getLocalDate(inCard).split(',')[1]:null}</div>
                    <div className="countryName">{country}</div>
                </div>  
                <div className="right">                                        
                     <img className ="flag" src={image} alt=""/>                    
                </div>               
            </div>
            <div className="part2">
                {inCard!=null?<img src={`https://openweathermap.org/img/wn/${inCard.weather[0].icon}.png`} alt="" className="icon"/>:null}
                <div className="Temp">{inCard!=null?`${Math.round(typeof(inCard.temp)==="number"?inCard.temp:inCard.temp.day)}°C`:null}</div>
                <div className="Description">{inCard!=null?inCard.weather[0].description:null}</div>
            </div>
        </div>
        <div className="weekly">
                <div className="infoCard">
                    <div className="info"><div>PRECIPITATION</div><div>{inCard!=null?`${inCard.pop}%`:null}</div></div>
                    <div className="info"><div>HUMIDITY</div><div>{inCard!=null?`${inCard.humidity}%`:null}</div></div>                    
                    <div className="info"><div>WIND</div><div>{inCard!=null?`${inCard.wind_speed} Km/h`:null}</div></div>                    
                    <div className="info"><div>Radiation UV</div><div>{inCard!=null?`${inCard.uvi}`:null}</div></div>
                </div>
                <div className="board">
                   <div className="card">
                        {temp!=null?temp.daily.map((d,i)=><div key={i} className="tempCapsule"
                        onClick={()=>setIncard(d)}>
                            <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`} alt="" width="40" height="40"/>
                            <div>{getLocalDate(d).split(',')[0].substring(0,3)}</div>
                            <div>{`${Math.round(d.temp.day)}°C`}</div>
                        </div>):null}
                   </div>
                </div>
        </div>
    </div>);
}
export default DataCard;