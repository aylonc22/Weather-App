import {useState,useEffect} from 'react';
import {json} from 'd3'; 
import { feature,presimplify,simplify} from 'topojson';

export const useData = ()=>{
    const [data,setData] = useState(null);    
   async function getTemp(country,temp)
   {  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_Wkey}&units=metric`);
    let data = await response.json();
   if(data.cod!=200)
        temp = [temp,({temp:null,country:country})];
    else
        temp = [temp,({temp:data.main.temp,country:country})];
        console.log(temp);
    return temp;
   }
     async function getTemps(data){
       let temp = [];        
    //    console.log(data);
       for(let i=0;i<data.length;i++)
       {
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data[i].properties.name}&appid=${process.env.REACT_APP_Wkey}&units=metric`);
        // let RD = await response.json();
        // if(RD.cod!=200)
        //      temp.push({temp:null,country:data[i].properties.name});
        //  else
        //     temp.push({temp:RD.main.temp,country:data[i].properties.name});
        let num = Math.floor(Math.random()*99) + 1; // this will get a number between 1 and 99;
        num *= Math.round(Math.random()) ? 1 : -1;
        temp.push({temp:num,country:data[i].properties.name})
             
        };
       // console.log(temp);
       return temp;

   }
    useEffect(()=>{        
        json('https://unpkg.com/world-atlas@2.0.2/countries-50m.json').then(topology=>{
        const { countries } = topology.objects; 
        topology = presimplify(topology);
        topology = simplify(topology,0);     
        const data = feature(topology,countries);        
       let details;
        let getDetails = async ()=>{
            let respone = await fetch("https://restcountries.eu/rest/v2/all");
            let d = await respone.json();
            details = d;
        }     
        getDetails().then(res=>getTemps(data.features).then(temp=> setData({data:data,temp:temp,details:details})));           
        });                               
        //westlimit=179.6; southlimit=-85.0; eastlimit=-178.3; northlimit=85.0   
        
    },[]);
    return data;
};