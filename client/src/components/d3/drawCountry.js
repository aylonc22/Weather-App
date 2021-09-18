 import * as d3 from 'd3'
 function getrgb(temps,feature)
{           
        const temp = temps.filter(e=>e.country===feature.properties.name)[0].temp;
        const maxTemp = 99;
        const minTemp = -99;
        const redVal = 255 / (maxTemp - minTemp) * (temp - minTemp);
        const blueVal = 255 / (maxTemp - minTemp) * (maxTemp - temp);
        return `rgb(${Math.round(redVal)}, 0, ${Math.round(blueVal)})`
}
function selectedCountry(event,data) {
    console.log(data);
}
const drawCountry = (svg,path,data)=>{            
    svg.selectAll('path').data(data.data.features)
    .enter().append('path').attr('class','country').attr('d',path)
    ;    
}
export default drawCountry;