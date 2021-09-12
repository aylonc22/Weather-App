import { geoMercator , geoPath, geoGraticule , select} from 'd3';
import drawCountry from './drawCountry.js';
import drawGlobe from './drawGlobe.js';
import removePath from './removePaths.js';
const renderMap =(data,   
    width,
    height)=>
{
    const SCALING_RATIO = 1 / 2.6 / Math.PI
    const scaling = width * SCALING_RATIO
    const svg = select('svg');            
    const projection = geoMercator()
    .translate([width / 2, height / 2])
    .scale(scaling);    
    const path = geoPath().projection(projection);
    const graticule = geoGraticule();   
   removePath(svg); 
   drawGlobe(svg,path);           
   drawCountry(svg,path,data);    
}
export default renderMap;