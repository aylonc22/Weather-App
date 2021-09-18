import * as d3 from 'd3'

const recenterMap = (selection, path,width,height,setSelectedCountry) => {     
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
    const Zoom = (event) => updateTransformations(event, d3.select("svg"));
    const manageSVG = d3.zoom().scaleExtent([0.9, 7]).on('zoom', Zoom);
    let bounds = path.bounds(selection),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
    translate = [width / 2 - scale * x, height / 2 - scale * y];

d3.select("svg").transition()
    .duration(750)       
    .call( manageSVG.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); 
    setSelectedCountry(selection.properties.name);   
}

export default recenterMap;