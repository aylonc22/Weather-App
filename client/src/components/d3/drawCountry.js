const drawCountry = (svg,path,data)=>{
    svg.selectAll('path').data(data.features)
    .enter().append('path').attr('class','country').attr('d',path);
}
export default drawCountry;