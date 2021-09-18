import * as d3 from 'd3';
function clicked(d,svg,path,manageSVG,width,height) {  
    let bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
        translate = [width / 2 - scale * x, height / 2 - scale * y];
  
    svg.transition()
        .duration(750)       
        .call( manageSVG.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );        
  }
    
function updateTransformations(event, svg) {
  svg
    .selectAll('path')
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('transform', event.transform);

  svg
    .selectAll('circle')
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('transform', event.transform);
}

const handleFetch = (searchValue,data,svg,path,manageSVG,width,height,setSelectedCountry)=>{  
  fetch(`https://restcountries.eu/rest/v2/name/${searchValue}`).then(res=>res.ok?res.json().then(res=>
  {
    let country =data.data.features.filter(d=>d.properties.name===res[0].name)    
    if(country.length!==0)
     {
       clicked(country[0],svg,path,manageSVG,width,height);
       setSelectedCountry(country[0].properties.name)
     }
     else      
       document.getElementById("input").value="try again"           
     
  }):document.getElementById("input").value="404")
}

const manageMap = (svg,path,setSelectedCountry,width,height,data) => {    
    const Zoom = (event) => updateTransformations(event, svg);
    const manageSVG = d3.zoom().scaleExtent([0.9, 7]).on('zoom', Zoom);
   
    svg.call(manageSVG);
    svg.selectAll("path").on("click",(e,d)=>{clicked(d,svg,path,manageSVG,width,height);setSelectedCountry(d.properties.name)});    
    d3.select("#recenter").on("click",()=>{svg.transition().duration(750).call( manageSVG.transform, d3.zoomIdentity);setSelectedCountry(null)});
    d3.select('#button').on("click",e=>handleFetch(document.getElementById("input").value,data,svg,path,manageSVG,width,height,setSelectedCountry));
    d3.select("#input").on("keyup",(e)=>e.key==="Enter"?handleFetch(document.getElementById("input").value,data,svg,path,manageSVG,width,height,setSelectedCountry):null)

}
export default manageMap;