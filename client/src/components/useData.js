import {useState,useEffect} from 'react';
import {json} from 'd3'; 
import { feature, mesh} from 'topojson';

export const useData = ()=>{
    const [data,setData] = useState(null);
    useEffect(()=>{
       json('https://unpkg.com/world-atlas@2.0.2/countries-50m.json').then(topology=>{
        const { countries,land } = topology.objects;   
        console.log(topology);
        setData({land:feature(topology,land),
                     interiors: mesh(topology,countries,(a,b)=>a!==b)
            })
        });
    },[]);
    return data;
};