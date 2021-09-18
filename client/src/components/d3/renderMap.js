import { geoMercator , geoPath , select} from 'd3';
import drawCountry from './drawCountry.js';
import drawGlobe from './drawGlobe.js';
import manageMap from './manageMap.js';
import recenterMap from './recenterMap.js';
import removePath from './removePaths.js';
const renderMap =(data,
    width,
    height,      
    setSelectedCountry)=>
{
       
    const SCALING_RATIO = 1 / 2.6 / Math.PI
    const scaling = width * SCALING_RATIO
    const svg = select('svg');           
    const projection = geoMercator()
    .translate([width / 2, height / 2])
    .scale(scaling);    
    const path = geoPath().projection(projection);
    removePath(svg);    
   drawGlobe(svg,path);          
   drawCountry(svg,path,data);      
   manageMap(svg,path,setSelectedCountry,width,height,data);
   select("#random").on("click",()=>recenterMap(data["data"].features[Math.floor(Math.random() * data["data"].features.length)],path,width,height,setSelectedCountry));       
}
export default renderMap;