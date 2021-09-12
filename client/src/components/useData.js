import {useState,useEffect} from 'react';
import {json} from 'd3'; 
import { feature} from 'topojson';

export const useData = ()=>{
    const [data,setData] = useState(null);
    useEffect(()=>{
       json('https://unpkg.com/world-atlas@2.0.2/countries-50m.json').then(topology=>{
        const { countries } = topology.objects;           
        setData(feature(topology,countries))
        });        
    },[]);
    return data;
};