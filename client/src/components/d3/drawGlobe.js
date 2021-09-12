const drawGlobe = (svg,path)=>{
    svg.append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'sphere')
    .attr('d',path);
}
export default drawGlobe;