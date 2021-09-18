import { geoOrthographic , geoPath, geoGraticule , select} from 'd3';
import drawCountry from './drawCountry.js';
import drawGlobe from './drawGlobe.js';
import manageGlobe from './manageGlobe.js';
import removePath from './removePaths.js';
import rotateGlobe from './rotateGlobe.js';
const renderGlobe =(data,
    enableRotation,
    width,
    height)=>
{
    const MARGIN = 20;
    const SCALING_FACTOR = 2.8;
    const scaling = Math.min(width, height) / 2 - MARGIN;
    const svg = select('svg');            
    const projection = geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(scaling)
    .clipAngle(90);
    const path = geoPath().projection(projection);
    const graticule = geoGraticule();
   let timer;
   removePath(svg); 
   drawGlobe(svg,path);           
   drawCountry(svg,path,data);
   manageGlobe(svg,projection,path);
   if(enableRotation===true)
        timer = rotateGlobe(svg,projection,path); 
    return timer; 
}
export default renderGlobe;